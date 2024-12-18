import { PrivateKey } from '@bsv/sdk';
import { ProtoWallet } from '@bsv/sdk';
import { CurvePoint } from '../CurvePoint';
import { SymmetricKey } from '@bsv/sdk';
import { Utils } from '@bsv/sdk';
import { SecurityLevels, SecurityLevel } from '@bsv/sdk';

describe('CurvePoint Library', () => {
    let participants: { wallet: ProtoWallet; publicKey: string }[];
    const message: number[] = [1, 2, 3, 4]; // Example message

    beforeAll(async () => {
        // Create participants with ProtoWallet and public keys
        participants = await Promise.all(
            Array(3)
                .fill(null)
                .map(async (_, index) => {
                    const privateKey = PrivateKey.fromRandom();
                    const wallet = new ProtoWallet(privateKey);
                    const { publicKey } = await wallet.getPublicKey({ identityKey: true });
                    console.log(`Participant ${index}:`);
                    console.log(`  Private Key: ${privateKey.toString()}`);
                    console.log(`  Public Key: ${publicKey}`);
                    return { wallet, publicKey };
                })
        );
    });
    
    // test('Encrypt and decrypt message successfully', async () => {
    //     // Step 1: Create an instance of CurvePoint for the sender
    //     const sender = participants[0];
    //     const curvePointSender = new CurvePoint(sender.wallet);
    //     const counterparties = participants.map((p) => p.publicKey);
    //     const protocolID: [SecurityLevel, string] = [SecurityLevels.App, 'exampleProtocol'];
    //     const keyID = 'exampleKey';
    //     const message = [1, 2, 3, 4, 5]; // Test message as an array of numbers
    
    //     // Step 2: Encrypt the message
    //     const { encryptedMessage, header } = await curvePointSender.encrypt(
    //         message,
    //         protocolID,
    //         keyID,
    //         counterparties
    //     );
    
    //     console.log('Constructed Header:', header);
    //     console.log('Encrypted Message:', encryptedMessage);
    
    //     // Step 3: Test decryption for each participant
    //     for (const [index, participant] of participants.entries()) {
    //         console.log(`Testing decryption for Participant ${index}: ${participant.publicKey}`);
    //         const curvePointParticipant = new CurvePoint(participant.wallet);
    
    //         try {
    //             // Participant attempts to decrypt the message
    //             const decryptedMessage = await curvePointParticipant.decrypt(
    //                 [...header, ...encryptedMessage],
    //                 protocolID,
    //                 keyID
    //             );
    
    //             // Validate that the decrypted message matches the original message
    //             expect(decryptedMessage).toEqual(message);
    //             console.log(`Decryption successful for Participant ${index}: ${participant.publicKey}`);
    //         } catch (error) {
    //             console.error(`Decryption failed for Participant ${index}: ${participant.publicKey}`);
    //             console.error(`Error: ${(error as Error).message}`);
    //             throw error;
    //         }
    //     }
    // });
    
    
    
    // test('Fail to decrypt with incorrect key', async () => {
    //     const protocolID: [SecurityLevel, string] = [SecurityLevels.Counterparty, 'testProtocol'];
    //     const sender = participants[0];
    //     const recipient = participants[1];
    //     const curvePointSender = new CurvePoint(sender.wallet);
    
    //     // Step 1: Use the CurvePoint's `encrypt` function to create a valid encrypted message and header
    //     const counterparties = [recipient.publicKey];
    //     const keyID = 'validKey';
    
    //     const { encryptedMessage, header } = await curvePointSender.encrypt(
    //         message,
    //         protocolID,
    //         keyID,
    //         counterparties
    //     );
    
    //     console.log('Generated Header:', header);
    //     console.log('Encrypted Message:', encryptedMessage);
    
    //     // Step 2: Create an instance of CurvePoint for the recipient
    //     const curvePointRecipient = new CurvePoint(recipient.wallet);
    
    //     // Step 3: Use an incorrect key ID to simulate failure
    //     const fakeKeyID = 'fakeKey';
    
    //     // Step 4: Attempt to decrypt the message with the incorrect key ID and expect failure
    //     await expect(
    //         curvePointRecipient.decrypt([...header, ...encryptedMessage], protocolID, fakeKeyID)
    //     ).rejects.toThrow("Decryption failed: Your key is not found in the header.");
    // });
    
    

    // test('Encrypt and decrypt empty message', async () => {
    //     // Step 1: Create an instance of CurvePoint for the sender
    //     const sender = participants[0];
    //     const curvePointSender = new CurvePoint(sender.wallet);
    //     const counterparties = participants.map((p) => p.publicKey);
    //     const protocolID: [SecurityLevel, string] = [SecurityLevels.App, 'exampleProtocol'];
    //     const keyID = 'exampleKey';
    
    //     // Step 2: Encrypt an empty message
    //     const emptyMessage: number[] = [];
    //     const { encryptedMessage, header } = await curvePointSender.encrypt(
    //         emptyMessage,
    //         protocolID,
    //         keyID,
    //         counterparties
    //     );
    
    //     console.log('Constructed Header:', header);
    //     console.log('Encrypted Message:', encryptedMessage);
    
    //     // Step 3: Each participant attempts to decrypt the empty message
    //     for (const participant of participants) {
    //         const curvePointParticipant = new CurvePoint(participant.wallet);
    
    //         try {
    //             const decryptedMessage = await curvePointParticipant.decrypt(
    //                 [...header, ...encryptedMessage],
    //                 protocolID,
    //                 keyID
    //             );
    
    //             // Step 4: Assert that the decrypted message is an empty array
    //             expect(decryptedMessage).toEqual([]);
    //             console.log(`Decryption successful for participant: ${participant.publicKey}`);
    //         } catch (error) {
    //             console.error(
    //                 `Decryption failed for empty message and participant: ${participant.publicKey}`
    //             );
    //             console.error(`Error: ${(error as Error).message}`);
    //             throw error;
    //         }
    //     }
    // });
    

    // test('Handle malformed header gracefully', async () => {
    //     // Step 1: Create an instance of CurvePoint for the sender
    //     const curvePoint = new CurvePoint(participants[0].wallet);
    //     const protocolID: [SecurityLevel, string] = [SecurityLevels.App, 'exampleProtocol'];
    //     const keyID = 'exampleKey';
    
    //     // Step 2: Create a malformed header
    //     const malformedHeader = new Utils.Writer()
    //         .writeUInt32LE(0x00000001) // Version field is valid
    //         .writeVarIntNum(1) // Number of recipients is 1
    //         .writeVarIntNum(0) // Invalid recipient public key length (should be 33 bytes)
    //         .toArray();
    
    //     const malformedCiphertext = [...malformedHeader, ...[5, 6, 7, 8]];
    
    //     console.log('Malformed Header:', malformedHeader);
    //     console.log('Malformed Ciphertext:', malformedCiphertext);
    
    //     // Step 3: Expect decryption to fail with a parsing error
    //     await expect(
    //         curvePoint.decrypt(malformedCiphertext, protocolID, keyID)
    //     ).rejects.toThrow('Failed to parse header or message.');
    // });
    
    

    // test('Encrypt and decrypt with single counterparty', async () => {
    //     // Step 1: Use participant[1] for encryption and decryption (single counterparty)
    //     const encryptingParticipant = participants[1];
    //     const decryptingParticipant = participants[1]; // Same participant for decryption
    //     const unauthorizedParticipant = participants[2]; // Unauthorized participant
    
    //     // Step 2: Initialize CurvePoint instances
    //     const curvePoint = new CurvePoint(decryptingParticipant.wallet);
    //     const unauthorizedCurvePoint = new CurvePoint(unauthorizedParticipant.wallet);
    
    //     const protocolID: [SecurityLevel, string] = [SecurityLevels.App, 'singleProtocol'];
    //     const keyID = 'exampleKey';
    
    //     // Log the public keys being used
    //     console.log('Public Key used for encryption (counterparty):', encryptingParticipant.publicKey);
    //     console.log('Public Key used for decryption (current user):', decryptingParticipant.publicKey);
    //     console.log('Public Key of unauthorized participant:', unauthorizedParticipant.publicKey);
    
    //     // Step 3: Encrypt the message with a single counterparty
    //     const { encryptedMessage, header } = await curvePoint.encrypt(
    //         message,
    //         protocolID,
    //         keyID,
    //         [encryptingParticipant.publicKey] // Single counterparty
    //     );
    
    //     console.log('Header:', header);
    //     console.log('Encrypted Message:', encryptedMessage);
    
    //     // Step 4: Attempt to decrypt the message as the intended recipient
    //     try {
    //         console.log('Starting single counterparty decryption...');
    //         const decryptedMessage = await curvePoint.decrypt(
    //             [...header, ...encryptedMessage],
    //             protocolID,
    //             keyID
    //         );
    
    //         // Validate the decrypted message matches the original
    //         expect(decryptedMessage).toEqual(message);
    //         console.log('Decryption successful for single counterparty.');
    //     } catch (error) {
    //         console.error('Failed to decrypt message for single counterparty.');
    //         console.error(`Error: ${(error as Error).message}`);
    //         throw error;
    //     }
    
    //     // Step 5: Attempt to decrypt the message as an unauthorized participant
    //     try {
    //         console.log('Starting decryption attempt by unauthorized participant...');
    //         await unauthorizedCurvePoint.decrypt(
    //             [...header, ...encryptedMessage],
    //             protocolID,
    //             keyID
    //         );
    
    //         // If decryption succeeds, fail the test
    //         console.error('Unauthorized participant was able to decrypt the message.');
    //         fail('Unauthorized participant should not be able to decrypt the message.');
    //     } catch (error) {
    //         console.log('Decryption failed for unauthorized participant as expected.');
    //         expect((error as Error).message).toContain('Your key is not found in the header');
    //     }
    // });
    
    

    // test('Handle large group of counterparties', async () => {
    //     // Step 1: Create a large group of counterparties
    //     const largeGroup: { privateKey: PrivateKey; publicKey: string }[] = Array(50)
    //         .fill(null)
    //         .map(() => {
    //             const privateKey = PrivateKey.fromRandom();
    //             const publicKey = privateKey.toPublicKey().toDER('hex'); // Convert public key to hex string
    
    //             if (typeof publicKey !== 'string') {
    //                 throw new Error('Public key conversion to hex failed.');
    //             }
    
    //             return { privateKey, publicKey };
    //         });
    
    //     const counterparties = largeGroup.map((p) => p.publicKey);
    
    //     // Step 2: Initialize CurvePoint instance
    //     const curvePointSender = new CurvePoint(participants[0].wallet);
    //     const protocolID: [SecurityLevel, string] = [SecurityLevels.App, 'largeGroupProtocol'];
    //     const keyID = 'largeGroupKey';
    
    //     // Step 3: Encrypt the message
    //     const { encryptedMessage, header } = await curvePointSender.encrypt(
    //         message,
    //         protocolID,
    //         keyID,
    //         counterparties
    //     );
    
    //     console.log('Header Length:', header.length);
    //     console.log('Encrypted Message Length:', encryptedMessage.length);
    
    //     // Step 4: Validate encryption output
    //     expect(header).toBeDefined();
    //     expect(header.length).toBeGreaterThan(0);
    //     expect(encryptedMessage).toBeDefined();
    //     expect(encryptedMessage.length).toBeGreaterThan(0);
    
    //     // Step 5: Attempt decryption for a random participant in the large group
    //     const randomParticipant = largeGroup[Math.floor(Math.random() * largeGroup.length)];
    //     const walletForRandomParticipant = new ProtoWallet(randomParticipant.privateKey);
    //     const curvePointRecipient = new CurvePoint(walletForRandomParticipant);
    
    //     try {
    //         console.log('Attempting decryption for a random participant...');
    //         const decryptedMessage = await curvePointRecipient.decrypt(
    //             [...header, ...encryptedMessage],
    //             protocolID,
    //             keyID
    //         );
    
    //         // Validate that the decrypted message matches the original
    //         expect(decryptedMessage).toEqual(message);
    //         console.log('Decryption successful for a random participant in the large group.');
    //     } catch (error) {
    //         console.error('Decryption failed for a random participant in the large group.');
    //         console.error(`Error: ${(error as Error).message}`);
    //         throw error;
    //     }
    // });
       

    // test('Subgroup Messaging', async () => {
    //     // Step 1: Initialize CurvePoint for the sender
    //     const curvePointSender = new CurvePoint(participants[0].wallet);
    //     const counterparties = participants.map((p) => p.publicKey);
    //     const protocolID: [SecurityLevel, string] = [SecurityLevels.App, 'subgroupMessagingProtocol'];
    //     const keyID = 'subgroupKey';
    
    //     console.log('Original Message:', message);
    
    //     // Step 2: Define the subgroup (exclude participant[1])
    //     const subgroupKeys = counterparties.filter((_, index) => index !== 1);
    //     console.log('Subgroup Public Keys:', subgroupKeys);
    
    //     // Step 3: Encrypt the message for the subgroup
    //     const { encryptedMessage, header } = await curvePointSender.encrypt(
    //         message,
    //         protocolID,
    //         keyID,
    //         subgroupKeys
    //     );
    
    //     console.log('Subgroup Header:', header);
    //     console.log('Subgroup Encrypted Message:', encryptedMessage);
    
    //     // Step 4: Test decryption for a non-subgroup member
    //     const nonSubgroupParticipant = participants[1]; // Participant excluded from subgroup
    //     const nonSubgroupCurvePoint = new CurvePoint(nonSubgroupParticipant.wallet);
    
    //     console.log(`Testing decryption for non-subgroup member: ${nonSubgroupParticipant.publicKey}`);
    //     await expect(
    //         nonSubgroupCurvePoint.decrypt([...header, ...encryptedMessage], protocolID, keyID)
    //     ).rejects.toThrow('Your key is not found in the header.');
    //     console.log('Non-subgroup member decryption failed as expected.');
    
    //     // Step 5: Test decryption for subgroup members
    //     for (const participant of participants) {
    //         const isSubgroupMember = subgroupKeys.includes(participant.publicKey);
    //         const curvePointRecipient = new CurvePoint(participant.wallet);
    
    //         console.log(`Testing decryption for participant: ${participant.publicKey}`);
    //         if (!isSubgroupMember) {
    //             console.log(`Skipping non-subgroup member: ${participant.publicKey}`);
    //             continue;
    //         }
    
    //         try {
    //             const decryptedMessage = await curvePointRecipient.decrypt(
    //                 [...header, ...encryptedMessage],
    //                 protocolID,
    //                 keyID
    //             );
    //             console.log(`Decryption successful for subgroup member: ${participant.publicKey}`);
    //             expect(decryptedMessage).toEqual(message);
    //         } catch (error) {
    //             console.error(`Decryption failed for subgroup member: ${participant.publicKey}`);
    //             console.error(`Error: ${(error as Error).message}`);
    //             throw error;
    //         }
    //     }
    // });
    
    
    

    // test('Partial Revocation', async () => {
    //     // Step 1: Initialize CurvePoint for the sender
    //     const curvePoint = new CurvePoint(participants[0].wallet);
    //     const counterparties = participants.map((p) => p.publicKey);
    //     const protocolID: [SecurityLevel, string] = [SecurityLevels.App, 'revocationProtocol'];
    //     const keyID = 'revocationKey';
    
    //     // Step 2: Encrypt the message with all participants
    //     const { encryptedMessage, header } = await curvePoint.encrypt(
    //         message,
    //         protocolID,
    //         keyID,
    //         counterparties
    //     );
    
    //     //console.log('Original Header:', header);
    
    //     // Step 3: Verify all participants can decrypt the message
    //     //console.log('Verifying decryption for all participants...');
    //     for (const participant of participants) {
    //         const curvePointParticipant = new CurvePoint(participant.wallet);
    //         const decryptedMessage = await curvePointParticipant.decrypt(
    //             [...header, ...encryptedMessage],
    //             protocolID,
    //             keyID
    //         );
    //         expect(decryptedMessage).toEqual(message);
    //         //console.log(`Decryption successful for participant: ${participant.publicKey}`);
    //     }
    
    //     // Step 4: Revoke access for Participant 1
    //     //console.log(`Revoking access for participant[1]: ${counterparties[1]}`);
    //     const newHeader = await curvePoint.removeParticipant(header, counterparties[1]);
    //     //console.log('Updated Header after revocation:', newHeader);
    
    //     // Step 5: Verify decryption behavior for all participants
    //     for (const participant of participants) {
    //         const curvePointParticipant = new CurvePoint(participant.wallet);
    //         if (participant.publicKey === counterparties[1]) {
    //             // Expect revoked participant to fail decryption
    //             //console.log(`Testing decryption failure for revoked participant: ${participant.publicKey}`);
    //             await expect(
    //                 curvePointParticipant.decrypt([...newHeader, ...encryptedMessage], protocolID, keyID)
    //             ).rejects.toThrow('Your key is not found in the header.');
    //             //console.log('Revoked participant decryption attempt failed as expected.');
    //         } else {
    //             // Expect remaining participants to decrypt successfully
    //             //console.log(`Testing decryption for remaining participant: ${participant.publicKey}`);
    //             const decryptedMessage = await curvePointParticipant.decrypt(
    //                 [...newHeader, ...encryptedMessage],
    //                 protocolID,
    //                 keyID
    //             );
    //             expect(decryptedMessage).toEqual(message);
    //             //console.log(`Decryption successful for remaining participant: ${participant.publicKey}`);
    //         }
    //     }
    // });
    

    
    
    
    test('Administrator Restriction: Only administrators can revoke access', async () => {
        // Step 1: Initialize CurvePoint for the sender
        const admin = participants[0]; // Sender is also an admin
        const nonAdmin = participants[1]; // Non-admin participant
        const targetParticipant = participants[2]; // Participant to be revoked
        const curvePointAdmin = new CurvePoint(admin.wallet);
        const curvePointNonAdmin = new CurvePoint(nonAdmin.wallet);
        const protocolID: [SecurityLevel, string] = [SecurityLevels.App, 'adminRestrictionProtocol'];
        const keyID = 'adminKey';
    
        // Step 2: Encrypt the message with all participants and specify administrators
        const counterparties = participants.map((p) => p.publicKey);
        const { encryptedMessage, header } = await curvePointAdmin.encrypt(
            message,
            protocolID,
            keyID,
            counterparties,
            [admin.publicKey] // Admin list
        );
    
        console.log('Original Header with Admins:', header);
    
        // Step 3: Admin revokes access for the target participant
        const updatedHeader = await curvePointAdmin.removeParticipant(header, targetParticipant.publicKey);
        console.log('Updated Header after Admin Revocation:', updatedHeader);
    
        // Verify the target participant is no longer in the header
        const curvePointTarget = new CurvePoint(targetParticipant.wallet);
        await expect(
            curvePointTarget.decrypt([...updatedHeader, ...encryptedMessage], protocolID, keyID)
        ).rejects.toThrow('Your key is not found in the header.');
    
        // Step 4: Non-admin attempts to revoke access
        await expect(
            curvePointNonAdmin.removeParticipant(header, targetParticipant.publicKey)
        ).rejects.toThrow('Only administrators are allowed to remove participants.');
    });
    
    
    
    
    

    // test('Access Granting: Grant new participant access to a previously encrypted message', async () => {
    //     const curvePoint = new CurvePoint(participants[0].wallet);
    //     const protocolID: [SecurityLevel, string] = [SecurityLevels.App, 'accessGrantProtocol'];
    //     const keyID = 'exampleKey';
    
    //     // Step 1: Encrypt a message for participants[0] and participants[1]
    //     const subset = [participants[0].publicKey, participants[1].publicKey];
    //     const { encryptedMessage, header } = await curvePoint.encrypt(
    //         message,
    //         protocolID,
    //         keyID,
    //         subset
    //     );
    
    //     console.log('Original header:', header);
    
    //     // Step 2: Grant access to participants[2]
    //     const newHeader = await curvePoint.addParticipant(
    //         header,
    //         protocolID,
    //         keyID,
    //         participants[2].publicKey
    //     );
    
    //     console.log('Updated header after granting access:', newHeader);
    
    //     // Step 3: Verify that participants[0], participants[1], and participants[2] can decrypt
    //     const accessList = [...subset, participants[2].publicKey];
    //     for (const participant of participants) {
    //         if (!accessList.includes(participant.publicKey)) {
    //             continue; // Skip participants without access
    //         }
    
    //         const participantCurvePoint = new CurvePoint(participant.wallet);
    //         const decryptedMessage = await participantCurvePoint.decrypt(
    //             [...newHeader, ...encryptedMessage],
    //             protocolID,
    //             keyID
    //         );
    //         expect(decryptedMessage).toEqual(message);
    //     }
    
    //     // Step 4: Ensure other participants cannot decrypt the updated message
    //     const unauthorizedParticipants = participants.filter(
    //         (participant) => !accessList.includes(participant.publicKey)
    //     );
    //     for (const participant of unauthorizedParticipants) {
    //         const participantCurvePoint = new CurvePoint(participant.wallet);
    //         await expect(
    //             participantCurvePoint.decrypt([...newHeader, ...encryptedMessage], protocolID, keyID)
    //         ).rejects.toThrow('Your key is not found in the header.');
    //     }
    // });
    
    

    // test('Message-Specific Key Derivation: Unique key derivation per message', async () => {
    //     const curvePoint = new CurvePoint(participants[0].wallet);
    //     const protocolID: [SecurityLevel, string] = [SecurityLevels.App, 'messageSpecificKey'];
    
    //     // Encrypt two messages with different keyIDs
    //     const keyID1 = 'messageKey1';
    //     const keyID2 = 'messageKey2';
    
    //     const encryption1 = await curvePoint.encrypt(
    //         message,
    //         protocolID,
    //         keyID1,
    //         participants.map((p) => p.publicKey)
    //     );
    
    //     const encryption2 = await curvePoint.encrypt(
    //         message,
    //         protocolID,
    //         keyID2,
    //         participants.map((p) => p.publicKey)
    //     );
    
    //     // Decrypt each message with the corresponding keyID
    //     const encryptions = [
    //         { encryption: encryption1, keyID: keyID1 },
    //         { encryption: encryption2, keyID: keyID2 },
    //     ];
    
    //     for (const { encryption, keyID } of encryptions) {
    //         for (const participant of participants) {
    //             const curvePointInstance = new CurvePoint(participant.wallet);
    //             const decryptedMessage = await curvePointInstance.decrypt(
    //                 [...encryption.header, ...encryption.encryptedMessage],
    //                 protocolID,
    //                 keyID
    //             );
    //             expect(decryptedMessage).toEqual(message);
    //         }
    //     }
    // });

    // test('Duplicate Counterparty Entries', async () => {
    //     const curvePoint = new CurvePoint(participants[0].wallet);
    //     const protocolID: [SecurityLevel, string] = [SecurityLevels.App, 'duplicateCounterparty'];
    //     const keyID = 'duplicateKey';
    
    //     // Include duplicate public keys in the counterparty list
    //     const counterparties = [
    //         participants[1].publicKey,
    //         participants[2].publicKey,
    //         participants[1].publicKey, // Duplicate
    //     ];
    
    //     try {
    //         const { encryptedMessage, header } = await curvePoint.encrypt(
    //             message,
    //             protocolID,
    //             keyID,
    //             counterparties
    //         );
    
    //         // Ensure all unique participants can decrypt the message
    //         const uniqueCounterparties = Array.from(new Set(counterparties)); // Deduplicate for validation
    //         for (const publicKey of uniqueCounterparties) {
    //             const participant = participants.find((p) => p.publicKey === publicKey);
    
    //             // Handle case where participant is not found
    //             if (!participant) {
    //                 throw new Error(`Participant with publicKey ${publicKey} not found.`);
    //             }
    
    //             const participantCurvePoint = new CurvePoint(participant.wallet);
    
    //             const decryptedMessage = await participantCurvePoint.decrypt(
    //                 [...header, ...encryptedMessage],
    //                 protocolID,
    //                 keyID
    //             );
    //             expect(decryptedMessage).toEqual(message);
    //         }
    //     } catch (error) {
    //         console.error('Encryption failed with duplicate counterparties:', error);
    //         throw error; // Rethrow to fail the test if unexpected error occurs
    //     }
    // });    

    // test('Zero Recipients', async () => {
    //     const curvePoint = new CurvePoint(participants[0].wallet);
    //     const protocolID: [SecurityLevel, string] = [SecurityLevels.App, 'zeroRecipients'];
    //     const keyID = 'noRecipientsKey';
    
    //     // Attempt to encrypt with an empty counterparties list
    //     const counterparties: string[] = [];
    
    //     await expect(
    //         curvePoint.encrypt(message, protocolID, keyID, counterparties)
    //     ).rejects.toThrow('No recipients specified for encryption.');
    // });
    
    // test('Unordered Recipients', async () => {
    //     const curvePoint = new CurvePoint(participants[0].wallet);
    //     const protocolID: [SecurityLevel, string] = [SecurityLevels.App, 'unorderedRecipients'];
    //     const keyID = 'unorderedKey';
    
    //     // Create counterparties in different orders
    //     const counterpartiesOrdered = participants.map((p) => p.publicKey);
    //     const counterpartiesUnordered = [...counterpartiesOrdered].reverse();
    
    //     // Encrypt the message with ordered counterparties
    //     const { encryptedMessage, header } = await curvePoint.encrypt(
    //         message,
    //         protocolID,
    //         keyID,
    //         counterpartiesOrdered
    //     );
    
    //     // Verify that all participants can decrypt regardless of counterparty order
    //     for (const participant of participants) {
    //         const participantCurvePoint = new CurvePoint(participant.wallet);
    
    //         // Decrypt using the unordered counterparties
    //         const decryptedMessage = await participantCurvePoint.decrypt(
    //             [...header, ...encryptedMessage],
    //             protocolID,
    //             keyID
    //         );
    //         expect(decryptedMessage).toEqual(message);
    //     }
    // });

    // test('Empty Header', async () => {
    //     const curvePoint = new CurvePoint(participants[0].wallet);
    //     const protocolID: [SecurityLevel, string] = [SecurityLevels.App, 'emptyHeader'];
    //     const keyID = 'emptyHeaderKey';
    
    //     // Create a completely empty header
    //     const emptyHeader: number[] = [];
    //     const malformedCiphertext = [...emptyHeader, ...[1, 2, 3, 4]];
    
    //     // Attempt to decrypt with an empty header
    //     await expect(
    //         curvePoint.decrypt(malformedCiphertext, protocolID, keyID)
    //     ).rejects.toThrow('Failed to parse header or message.');
    // });

    // test('Malformed Encrypted Key', async () => {
    //     const curvePoint = new CurvePoint(participants[0].wallet);
    //     const protocolID: [SecurityLevel, string] = [SecurityLevels.App, 'malformedKey'];
    //     const keyID = 'malformedKey';
    
    //     // Encrypt the message normally
    //     const { encryptedMessage, header } = await curvePoint.encrypt(
    //         message,
    //         protocolID,
    //         keyID,
    //         participants.map((p) => p.publicKey)
    //     );
    
    //     // Corrupt the encrypted key for the first counterparty
    //     const reader = new Utils.Reader(header);
    //     const headerLength = reader.readVarIntNum();
    //     const malformedHeader = [...reader.read(headerLength)];
    //     malformedHeader[10] = 255; // Arbitrarily corrupt a byte in the header
    
    //     // Attempt to decrypt with the malformed header
    //     const malformedCiphertext = [...malformedHeader, ...encryptedMessage];
    //     await expect(
    //         curvePoint.decrypt(malformedCiphertext, protocolID, keyID)
    //     ).rejects.toThrow('Decryption failed: Your key is not found in the header.');
    // });

    // test('Replay Attack Prevention', async () => {
    //     const curvePoint = new CurvePoint(participants[0].wallet);
    //     const protocolID: [SecurityLevel, string] = [SecurityLevels.App, 'replayAttack'];
    //     const keyID = 'replayKey';
    
    //     // Encrypt the same message twice
    //     const encryption1 = await curvePoint.encrypt(
    //         message,
    //         protocolID,
    //         keyID,
    //         participants.map((p) => p.publicKey)
    //     );
    
    //     const encryption2 = await curvePoint.encrypt(
    //         message,
    //         protocolID,
    //         keyID,
    //         participants.map((p) => p.publicKey)
    //     );
    
    //     // Ensure the ciphertexts are different
    //     expect(encryption1.encryptedMessage).not.toEqual(encryption2.encryptedMessage);
    //     expect(encryption1.header).not.toEqual(encryption2.header);
    
    //     // Decrypt both messages to verify correctness
    //     for (const encryption of [encryption1, encryption2]) {
    //         for (const participant of participants) {
    //             const participantCurvePoint = new CurvePoint(participant.wallet);
    
    //             const decryptedMessage = await participantCurvePoint.decrypt(
    //                 [...encryption.header, ...encryption.encryptedMessage],
    //                 protocolID,
    //                 keyID
    //             );
    //             expect(decryptedMessage).toEqual(message);
    //         }
    //     }
    // });

    // test('Header Tampering', async () => {
    //     const curvePoint = new CurvePoint(participants[0].wallet);
    //     const protocolID: [SecurityLevel, string] = [SecurityLevels.App, 'headerTampering'];
    //     const keyID = 'tamperedKey';
    
    //     const { encryptedMessage, header } = await curvePoint.encrypt(
    //         message,
    //         protocolID,
    //         keyID,
    //         participants.map((p) => p.publicKey)
    //     );
    
    //     // Tamper with the header by modifying a public key
    //     const tamperedHeader = [...header];
    //     tamperedHeader[10] = tamperedHeader[10] ^ 0xff; // Invert a random byte in the header
    
    //     // Attempt to decrypt with the tampered header
    //     const tamperedCiphertext = [...tamperedHeader, ...encryptedMessage];
    
    //     await expect(
    //         curvePoint.decrypt(tamperedCiphertext, protocolID, keyID)
    //     ).rejects.toThrow('Decryption failed: Your key is not found in the header.');
    // });

    // test('Key Reuse', async () => {
    //     const curvePoint = new CurvePoint(participants[0].wallet);
    //     const protocolID: [SecurityLevel, string] = [SecurityLevels.App, 'keyReuse'];
    //     const keyID = 'reusedKey';
    
    //     // Generate a single symmetric key to reuse across multiple encryptions
    //     const symmetricKey = SymmetricKey.fromRandom();
    
    //     // Encrypt two different messages with the same key
    //     const message1 = [1, 2, 3, 4];
    //     const message2 = [5, 6, 7, 8];
    
    //     const encryptedMessage1 = symmetricKey.encrypt(message1) as number[];
    //     const encryptedMessage2 = symmetricKey.encrypt(message2) as number[];
    
    //     const header = curvePoint.buildHeader(
    //         participants.map((p) => p.publicKey),
    //         [symmetricKey.toArray(), symmetricKey.toArray()]
    //     );
    
    //     // Verify that both messages can be decrypted securely
    //     for (const [encryptedMessage, originalMessage] of [
    //         [encryptedMessage1, message1],
    //         [encryptedMessage2, message2],
    //     ]) {
    //         for (const participant of participants) {
    //             const participantCurvePoint = new CurvePoint(participant.wallet);
    //             const decryptedMessage = await participantCurvePoint.decrypt(
    //                 [...header, ...encryptedMessage],
    //                 protocolID,
    //                 keyID
    //             );
    //             expect(decryptedMessage).toEqual(originalMessage);
    //         }
    //     }
    // });

    // test('Incorrect IV Handling', async () => {
    //     const curvePoint = new CurvePoint(participants[0].wallet);
    //     const protocolID: [SecurityLevel, string] = [SecurityLevels.App, 'incorrectIV'];
    //     const keyID = 'ivTestKey';
    
    //     const { encryptedMessage, header } = await curvePoint.encrypt(
    //         message,
    //         protocolID,
    //         keyID,
    //         participants.map((p) => p.publicKey)
    //     );
    
    //     // Tamper with the IV in the encrypted message
    //     const tamperedEncryptedMessage = [...encryptedMessage];
    //     tamperedEncryptedMessage[0] = tamperedEncryptedMessage[0] ^ 0xff; // Corrupt the first byte of the encrypted message
    
    //     const tamperedCiphertext = [...header, ...tamperedEncryptedMessage];
    
    //     // Attempt to decrypt with the tampered IV
    //     await expect(
    //         curvePoint.decrypt(tamperedCiphertext, protocolID, keyID)
    //     ).rejects.toThrow('Decryption failed: Integrity check failed.');
    // });

    // test('Very Large Groups', async () => {
    //     const largeGroupSize = 1000;
    //     const largeGroup: string[] = Array(largeGroupSize)
    //         .fill(null)
    //         .map(() => {
    //             const privateKey = PrivateKey.fromRandom();
    //             const publicKey = privateKey.toPublicKey();
    //             return publicKey.toDER('hex') as string; // Explicitly cast to string
    //         });

    
    //     const curvePoint = new CurvePoint(participants[0].wallet);
    //     const protocolID: [SecurityLevel, string] = [SecurityLevels.App, 'veryLargeGroup'];
    //     const keyID = 'largeGroupKey';
    
    //     const { encryptedMessage, header } = await curvePoint.encrypt(
    //         message,
    //         protocolID,
    //         keyID,
    //         largeGroup
    //     );
    
    //     // Verify the header and encrypted message
    //     expect(header).toBeDefined();
    //     expect(header.length).toBeGreaterThan(0);
    //     expect(encryptedMessage).toBeDefined();
    //     expect(encryptedMessage.length).toBeGreaterThan(0);
    
    //     // Spot-check decryption for a few participants
    //     for (let i = 0; i < 10; i++) {
    //         const publicKey = largeGroup[i];
    //         const participant = participants.find((p) => p.publicKey === publicKey);
    
    //         if (participant) {
    //             const participantCurvePoint = new CurvePoint(participant.wallet);
    //             const decryptedMessage = await participantCurvePoint.decrypt(
    //                 [...header, ...encryptedMessage],
    //                 protocolID,
    //                 keyID
    //             );
    //             expect(decryptedMessage).toEqual(message);
    //         }
    //     }
    // });
    
    // test('Chunked Encryption', async () => {
    //     const curvePoint = new CurvePoint(participants[0].wallet);
    //     const protocolID: [SecurityLevel, string] = [SecurityLevels.App, 'chunkedEncryption'];
    //     const keyID = 'chunkedKey';
    
    //     // Create a large message
    //     const largeMessage: number[] = Array(10_000).fill(1); // A message with 10,000 numbers
    
    //     // Split the large message into chunks (e.g., 1,000 per chunk)
    //     const chunkSize = 1_000;
    //     const chunks: number[][] = []; // Explicitly define the type for chunks
    //     for (let i = 0; i < largeMessage.length; i += chunkSize) {
    //         chunks.push(largeMessage.slice(i, i + chunkSize));
    //     }
    
    //     const encryptedChunks = await Promise.all(
    //         chunks.map(async (chunk) =>
    //             curvePoint.encrypt(chunk, protocolID, keyID, participants.map((p) => p.publicKey))
    //         )
    //     );
    
    //     // Decrypt each chunk and reconstruct the original message
    //     let reconstructedMessage: number[] = [];
    //     for (const { encryptedMessage, header } of encryptedChunks) {
    //         for (const participant of participants) {
    //             const participantCurvePoint = new CurvePoint(participant.wallet);
    //             const decryptedChunk = await participantCurvePoint.decrypt(
    //                 [...header, ...encryptedMessage],
    //                 protocolID,
    //                 keyID
    //             );
    //             reconstructedMessage = reconstructedMessage.concat(decryptedChunk);
    //         }
    //     }
    
    //     // Verify the reconstructed message matches the original
    //     expect(reconstructedMessage).toEqual(largeMessage);
    // });

    // test('Encryption and Decryption Timing', async () => {
    //     const protocolID: [SecurityLevel, string] = [SecurityLevels.App, 'timingTest'];
    //     const keyID = 'timingKey';
    
    //     const groupSizes = [10, 100, 500]; // Varying group sizes
    //     const messageSizes = [100, 1000, 10000]; // Varying message sizes
    
    //     for (const groupSize of groupSizes) {
    //         const group: string[] = Array(groupSize)
    //             .fill(null)
    //             .map(() => {
    //                 const privateKey = PrivateKey.fromRandom();
    //                 return privateKey.toPublicKey().toDER('hex') as string; // Ensure it's a string
    //             });
    
    //         for (const messageSize of messageSizes) {
    //             const message = Array(messageSize).fill(1); // Large message
    //             const curvePoint = new CurvePoint(participants[0].wallet);
    
    //             // Measure encryption time
    //             const startEncryption = performance.now();
    //             const { encryptedMessage, header } = await curvePoint.encrypt(
    //                 message,
    //                 protocolID,
    //                 keyID,
    //                 group
    //             );
    //             const endEncryption = performance.now();
    //             console.log(
    //                 `Encryption time for group size ${groupSize} and message size ${messageSize}: ${
    //                     endEncryption - startEncryption
    //                 } ms`
    //             );
    
    //             // Measure decryption time
    //             const startDecryption = performance.now();
    //             const decryptedMessage = await curvePoint.decrypt(
    //                 [...header, ...encryptedMessage],
    //                 protocolID,
    //                 keyID
    //             );
    //             const endDecryption = performance.now();
    //             console.log(
    //                 `Decryption time for group size ${groupSize} and message size ${messageSize}: ${
    //                     endDecryption - startDecryption
    //                 } ms`
    //             );
    
    //             expect(decryptedMessage).toEqual(message);
    //         }
    //     }
    // });    
    
    // test('Memory Usage', async () => {
    //     const protocolID: [SecurityLevel, string] = [SecurityLevels.App, 'memoryTest'];
    //     const keyID = 'memoryKey';
    
    //     const largeGroupSize = 1000; // Large number of participants
    //     const largeMessageSize = 100_000; // Large message
    //     const largeGroup: string[] = Array(largeGroupSize)
    //         .fill(null)
    //         .map(() => {
    //             const privateKey = PrivateKey.fromRandom();
    //             return privateKey.toPublicKey().toDER('hex') as string; // Ensure it is a string
    //         });
    //     const largeMessage = Array(largeMessageSize).fill(1);
    
    //     const curvePoint = new CurvePoint(participants[0].wallet);
    
    //     console.log('Memory usage before encryption:', process.memoryUsage());
    
    //     // Encrypt
    //     const { encryptedMessage, header } = await curvePoint.encrypt(
    //         largeMessage,
    //         protocolID,
    //         keyID,
    //         largeGroup
    //     );
    
    //     console.log('Memory usage after encryption:', process.memoryUsage());
    
    //     // Decrypt
    //     const decryptedMessage = await curvePoint.decrypt(
    //         [...header, ...encryptedMessage],
    //         protocolID,
    //         keyID
    //     );
    
    //     console.log('Memory usage after decryption:', process.memoryUsage());
    
    //     expect(decryptedMessage).toEqual(largeMessage);
    // });

    // test('Cross-Wallet Compatibility', async () => {
    //     const protocolID: [SecurityLevel, string] = [SecurityLevels.App, 'crossWallet'];
    //     const keyID = 'crossWalletKey';
    
    //     // Create wallets for two participants
    //     const participant1 = {
    //         privateKey: PrivateKey.fromRandom(),
    //         wallet: new ProtoWallet(PrivateKey.fromRandom()),
    //     };
    //     const participant2 = {
    //         privateKey: PrivateKey.fromRandom(),
    //         wallet: new ProtoWallet(PrivateKey.fromRandom()),
    //     };
    
    //     // Get public keys for the participants
    //     const publicKey1 = (await participant1.wallet.getPublicKey({ identityKey: true })).publicKey;
    //     const publicKey2 = (await participant2.wallet.getPublicKey({ identityKey: true })).publicKey;
    
    //     // Ensure public keys are available
    //     expect(publicKey1).toBeDefined();
    //     expect(publicKey2).toBeDefined();
    
    //     // Participant 1 encrypts a message for participant 2
    //     const message = [1, 2, 3, 4];
    //     const curvePoint1 = new CurvePoint(participant1.wallet);
    
    //     const { encryptedMessage, header } = await curvePoint1.encrypt(
    //         message,
    //         protocolID,
    //         keyID,
    //         [publicKey2]
    //     );
    
    //     // Participant 2 decrypts the message
    //     const curvePoint2 = new CurvePoint(participant2.wallet);
    //     const decryptedMessage = await curvePoint2.decrypt(
    //         [...header, ...encryptedMessage],
    //         protocolID,
    //         keyID
    //     );
    
    //     // Verify the decrypted message matches the original
    //     expect(decryptedMessage).toEqual(message);
    // });

    // test('Protocol Compatibility', async () => {
    //     const keyID = 'protocolTestKey';
    //     const protocolIDs: [SecurityLevel, string][] = [
    //         [SecurityLevels.Silent, 'protocolSilent'],
    //         [SecurityLevels.App, 'protocolApp'],
    //         [SecurityLevels.Counterparty, 'protocolCounterparty'],
    //     ];
    
    //     const curvePoint = new CurvePoint(participants[0].wallet);
    
    //     // Encrypt and decrypt a message for each protocolID
    //     for (const protocolID of protocolIDs) {
    //         const message = [42, 43, 44, 45]; // Example message
    //         const counterparties = participants.map((p) => p.publicKey);
    
    //         // Encrypt the message
    //         const { encryptedMessage, header } = await curvePoint.encrypt(
    //             message,
    //             protocolID,
    //             keyID,
    //             counterparties
    //         );
    
    //         // Ensure each participant can decrypt the message
    //         for (const participant of participants) {
    //             const participantCurvePoint = new CurvePoint(participant.wallet);
    //             const decryptedMessage = await participantCurvePoint.decrypt(
    //                 [...header, ...encryptedMessage],
    //                 protocolID,
    //                 keyID
    //             );
    
    //             // Verify the decrypted message matches the original
    //             expect(decryptedMessage).toEqual(message);
    //         }
    //     }
    // });
    
});
