
**DES Encryption Implementation**

**Running Instructions**
1. Install the latest version of Node from [here](https://nodejs.dev/download/).
2. Clone this repo.
3. Run `cd DES-Encryption-Implementation`
4. Run `npm install`.
5. Run `npm start`

**SCREENSHOT**

**![](https://raw.githubusercontent.com/au6rey/DES-Encryption-Implementation/main/screenshot/result.png)**

**DESIGN**

The `src` folder contains the following files:

**models.ts**

Has data type definitions for representing the input parameters such as input parameters.

**utils.ts**

Has helper methods/functions to be used by the DES implementation.

**Functions:**

 **1. decimalTo4BitBinary**
 
Coverts a base-10 integer to 4-bit binary.

 **2. hexToBinary**
 
Coverts base-16 integer to binary.

 **3. binaryToHex**
 
Coverts a binary integer to base-16 integer.

 **4. asciiToHex**

Coverts ASCII encoded string codes to base-16 integer.

 **5. hexToAscii**
 
Coverts base-16 integer to ASCII encoded string. 

 **6. rotateString**
 
A helper function for implementing the circular shift that is used in generating the subkeys for DES rounds.
Example: `shiftString(“hello”, 2) = “llohe”`.

 **7. divideStringToChunks**
 
Divides long strings into smaller specified parts for easy processing for example when dividing binary to 6-bit chunks for the substitution stage.
Example: `divideStringToChunks("FFFFFFFF", 2) = [ 'FF', 'FF', 'FF', 'FF' ]`

 **6. xor**
 
 Implements XOR operation.
 
 **6. halfenString**

Divides string in two.

 **constants.ts**
This file has tables and boxes used in encryption and subkey generation.

**Variables:**

**IP**
    
Holds the table that specifies the input permutation on a 64-bit block.
The meaning is as follows: the first bit of the output is taken from the `IP[0]=58th bit of the input; the second bit from the IP[1]=50th bit`, and so on, with the last bit of the output taken from the `IP[63]=7th bit of the input.`

**FINAL_IP**

Holds the final permutation; the inverse of the initial permutation; the table is interpreted similarly.

**E**

Holds the expansion function which is interpreted as for the initial and final permutations. Some bits from the input are duplicated at the output.
The table is used to expand a 32-bit half block to 48 bits.
The values in the array are obtained randomly.

**P**

Holds the `P` permutation table that shuffles the bits of a 32-bit half-block. 
The values in the array are random non-repeated integers ranging from 1 to 32.
  
**PC1**
    
Used in the first step of subkey generation. This has 56 unique integers that range from 1 to 64.  
The values from `PC1[0]` to `PC1[27]` represent the left half from which bits from the input key form the left section of the key schedule state. 
The values from `PC1[28]` to `PC1[55]` represent the right half from which bits from the input key form the right section of the key schedule state.

**PC2**

Holds the table used for the permutation that selects the 48-bit subkey for each round from the 56-bit key-schedule state. This permutation will ignore 8 bits missing from the array.
    
**SBOX**

This is an array of eight S-boxes used in DES. Each S-box replaces a 6-bit input with a 4-bit output. Given a 6-bit input, the 4-bit output is found by selecting the row using the outer two bits, and the column using the inner four bits.

**ROTATION_ROUNDS**
    
Represents the bits rotation rounds. Where `ROTATION_ROUNDS[0]` is the number of left rotations done on the first round, `ROTATION_ROUNDS[1]` is the number of left rotations done on the second round, and so on.

**des.ts**
**Class Variables:**

 - **mainKeyBinary**

Holds the 56-bit hexadecimal key used by DES.

 - **subKeys**

An array that holds the schedules generated sub keys.

**Methods:**

 **1. constructor**
 
- Initializes the class with a 56-bit hexadecimal key.
- Calls `generateSubkeys` to schedule subkeys.

 **2. generateSubkeys**
-   Implements key generation algorithm.
-   Utilizes the `PC1` array as the table to do the first permutation.
-   Only 56 bits of the 64 bits of the input are selected; the remaining eight missing in the `PC1` array were specified for use as parity bits.
-   The parity bits are dropped from the main 64-bit key to make 56 bit space for further operation for each round.
-   The result of the previous step is split in two using the `halfenString` function.
-   Before a round sub-key is selected, each half of the key schedule state is rotated left by a number of places.
-   `ROTATION_ROUNDS` specifies the number of places rotated.
-   For each round, The key is divided into two 28-bit parts, each part is shifted left (circular) one or two bits. This is achieved by the `circularShift` local function.
-   After shifting, two parts are then combined to form a 56-bit temp-key again.
-   Lastly, `PC2` array is used to do one more permutation on the temp key to form the final subkey for the round.
-   This method returns an array of the subkeys.

 **3. encipher**
 
- This is used for encryption. It accepts a 64-bit hexadecimal string as input and calls `getCipher` with the cipher-type set as `CipherType.encipher`.

 **4. decipher**
 
- This is used for encryption. It accepts a 64-bit hexadecimal string as input and calls `getCipher` with the cipher-type set as `CipherType.decipher`.

 **5. getCipher**
 
-   This is used for both encryption and decryption. It accepts a 64-bit hexadecimal string as a message and a cipher-type enum which can either be `CipherType.encipher` or `CipherType.decipher`.
- It performs the initial permutation on the message by calling `initialPermutation`.
- The output of the above step is `Left Plain Text (LPT)` and `Right Plain Text (RPT)` which are then used in the Feistal rounds with the specified cipher-type using the method `feistalRounds`.
- The result of the above step undergoes the final permutation using `finalPermutation`, then returns the value obtained.

 **6. initialPermutation**
 - Implements the initial permutation of the input.
- Accepts a 64-bit message.
- Utilizes the `IP` array to substitute input bits then breaks the result into a `Left Plain Text` and `Right Plain Text`.

 **7. feistalRounds**
-   Implements 16 rounds of Feistal enciphering.
-   Takes the `Left Plain Text`, `Right Plain Text`, and `Ciphertype` as input.
-   If the cipher type is set as encrypting, the subkeys are scheduled in reverse.
-   The `feistalCipher` local function implements the Feistel (F) function which operates on half a block.
-   Feistel (F) function consists of four stages:
*1.  Expansion* -Achieved by calling `expandBlock` with `Right Plain Text` as input.
*2.  Key mixing* - The result of the above is combined with a subkey using an XOR operation. The `xor` function is used.
*3.  Substitution* -Achieved by calling `getSBoxOutput` with the result of the above as input.
*4.  Permutation* - the 32 outputs from the S-boxes are rearranged according to the `PBOX` array.
-   The result afterward is a Feistal Block that is repeated 16 times such that:

		For 0 < n < 16:
			LPTn+1 = RPTn
			RPTn+1 = LPTn ⊕ F(RPTn, subKeyn)

At the end of the loop, the method returns `RPT+LPT`.

 **8. expandBlock**
 
- Takes in a 32-bit half-block expands it to 48 bits using the E array by duplicating half of the bits.

 **9. getSBoxOutput**
-   Divides the input block into eight 6-bit pieces before processing by the S-boxes stored in the `PBOX` array.
    
-   Each of the eight S-boxes replaces its six input bits with four output bits according to a non-linear transformation, provided in the form of a lookup table.
    
-   For example, a 6-bit piece "**011011**" has outer bits "**01**" and inner bits "**1101**";

		The row is 012 = 110
		The column = 11012 = 1310
		If this is the first 6-bit piece of the input block:
		The chosen integer would be at SBOX[0][16 * 1 + 13]

- The chosen integer is then converted to a 4-bit binary using `decimalTo4BitBinary`.

 **10. getSBoxOutput**

-   Implements the final permutation of the ciphering.
-   Uses the `FINAL_IP` array for substituting bits in the input pair.
-   The result is converted to hexadecimal and returned.

**index.ts**
This is the entry file used for testing and logging the problem.
