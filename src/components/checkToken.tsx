import { useEffect, useState } from 'react';

interface TokenStatus {
    isValid: boolean;
    isExpired: boolean;
}

function useCheckToken(): TokenStatus {
    const [tokenStatus, setTokenStatus] = useState<TokenStatus>({ isValid: false, isExpired: false });

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (!token) {
            setTokenStatus({ isValid: false, isExpired: true });
            return;
        }

        try {
            const base64Url = token.split('.')[1];
            const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
            const payload = JSON.parse(window.atob(base64));

            const isExpired = payload.exp < Date.now() / 1000;
            setTokenStatus({ isValid: !isExpired, isExpired });
        } catch (error) {
            setTokenStatus({ isValid: false, isExpired: true });
        }
    }, []);

    return tokenStatus;
}

export default useCheckToken;
