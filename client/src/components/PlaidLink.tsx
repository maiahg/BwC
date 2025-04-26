import React, { useCallback, useEffect, useState } from 'react'
import { Button } from './ui/button'
import { PlaidLinkOnSuccess, PlaidLinkOptions, usePlaidLink } from 'react-plaid-link'
import { useRouter } from 'next/navigation';
import { useCreateLinkTokenMutation, useExchangePublicTokenMutation } from '@/state/api'
import Image from 'next/image';
import { Skeleton } from '@/components/ui/skeleton'

const PlaidLink = ({ user, variant }: PlaidLinkProps) => {
  const router = useRouter();
  const [token, setToken] = useState('');

  const [createLinkToken, { data, isLoading, error }] = useCreateLinkTokenMutation();
  const [exchangePublicToken] = useExchangePublicTokenMutation();

  useEffect(() => {
    const fetchLinkToken = async () => {
      try {
        const response = await createLinkToken(user);
        setToken(response?.data.linkToken);
      } catch (err) {
        console.error("Failed to create link token", err);
      }
    };
    fetchLinkToken();
  }, [user]);

  const onSuccess = useCallback<PlaidLinkOnSuccess>(async (public_token: string) => {
    await exchangePublicToken({
      _id: user._id,
      public_token,
    })

    router.push('/dashboard');
  }, [user, router])

  const config: PlaidLinkOptions = {
    token,
    onSuccess,
  };

  const { open, ready } = usePlaidLink(config);
  
    if (isLoading) {
      return (
      <div className="flex items-center justify-center min-h-screen flex-col space-y-3">
        <Skeleton className="h-[125px] w-[250px] rounded-xl bg-gray-400"/>
        <div className="space-y-2">
          <Skeleton className="h-4 w-[250px] bg-gray-400" />
          <Skeleton className="h-4 w-[200px] bg-gray-400" />
        </div>
      </div>
      )
    };

  return (
    <>
      {variant === 'primary' ? (
        <Button
          onClick={() => open()}
          disabled={!ready}
          className="plaidlink-primary"
        >
          Connect bank
        </Button>
      ): variant === 'ghost' ? (
        <Button onClick={() => open()} variant="ghost" className="plaidlink-ghost">
          <Image 
            src="/icons/connect-bank.svg"
            alt="connect bank"
            width={24}
            height={24}
          />
          <p className='hiddenl text-[16px] font-semibold text-black-2 xl:block'>Connect bank</p>
        </Button>
      ): (
        <Button onClick={() => open()} className="plaidlink-default">
          <Image 
            src="/icons/connect-bank.svg"
            alt="connect bank"
            width={24}
            height={24}
          />
          <p className='text-[16px] font-semibold text-black-2'>Connect bank</p>
        </Button>
      )}
    </>
  )
}

export default PlaidLink