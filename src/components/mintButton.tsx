import { useState, useRef } from 'react';
import { Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button, useDisclosure, Avatar, user } from "@nextui-org/react";
import { abiFidelityToken, addressFidelityToken } from '../../smartContracts/abiFidelityToken';
import Image from 'next/image';
import { simulateContract, writeContract, waitForTransactionReceipt} from '@wagmi/core/actions'
import { getAccount } from '@wagmi/core/actions'
import { config } from '../wagmi'
import { parseUnits } from 'viem'

interface MintButtonProps {
    company_name: string;
    user_name: string;
    fidelityLevel: number;
}

const MintButton: React.FC<MintButtonProps> = ({ company_name, user_name, fidelityLevel }) => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [modalContentToken, setModalContentToken] = useState('');

    const [accountAddress, setAccountAddress] = useState<`0x${string}`>('0x0');

    const closeModal = () => setIsModalOpen(false);


    async function handleMintToken() { // To mintToken

        const account = getAccount(config);
        if (account && account.address) {
            // Only set the account address if it's defined
            setAccountAddress(account.address);
            console.log('address', account);
            let amountInWei = parseUnits('100', 18);
            await mintToken(account.address, amountInWei);
        } else {
            console.error("Account or account address is undefined.");
        }
    }

    async function mintToken(to: `0x${string}`, amount: BigInt) {
        try {
            const { request } = await simulateContract(config, {
                address: addressFidelityToken,
                abi: abiFidelityToken,
                functionName: 'mint',
                args: [to, amount],
            })
            const hash = await writeContract(config, request)
            const data = await waitForTransactionReceipt(config, {
                hash: hash,
            }) // On attend que la transaction soit confirmée (Comme ethers: await tx.wait(); )

            console.log('hash ', data.blockHash);
            setModalContentToken(data.blockHash);
            setIsModalOpen(true);
        } catch (error) {
            console.error(error);
        }
    }
    return (
        <div>
            <Button color="default" variant="bordered" onClick={() => handleMintToken()} size="lg" className="flex items-left justify-between p-4">
                <div className="flex items-center">
                    <Image
                        src="/images/Tezos-logo.svg"
                        alt="Logo"
                        width={48}
                        height={48}
                        className="text-black/50 mb-0.5 dark:text-white/90 text-slate-400 pointer-events-none flex-shrink-0"
                    />
                    <div className="ml-3">
                        <h2 className="mb-1">EtherLink</h2>
                        <p className="text-sm">Mint your rewards</p>
                    </div>
                </div>
            </Button>

            {isModalOpen && (
                <Modal backdrop={'blur'} isOpen={isModalOpen} onClose={closeModal} className="overflow-auto max-w-4xl w-full mx-auto">
                    <ModalContent className="bg-white shadow-lg rounded-lg overflow-hidden">
                        <ModalHeader className="flex justify-start items-center p-5 border-b">
                            <Image
                                src="/images/icon/success.svg"
                                alt="Logo"
                                width={36}
                                height={36}
                                className="text-black/50 mb-0.5 dark:text-white/90 text-slate-400 pointer-events-none flex-shrink-0 mr-2"
                            />
                            <p className="text-xl font-bold break-words">Well Done!</p>
                        </ModalHeader>
                        <ModalBody>
                            <div className="">
                                <p className="font-semibold" >Token hash:</p>
                                <p>{modalContentToken}</p>
                            </div>
                        </ModalBody>
                        <ModalFooter className="flex justify-between items-center p-5 border-t">
                            <Button color="danger" variant="light" onPress={closeModal}>
                                Close
                            </Button>
                        </ModalFooter>
                    </ModalContent>
                </Modal>
            )
            }
        </div >
    );
};

export default MintButton;