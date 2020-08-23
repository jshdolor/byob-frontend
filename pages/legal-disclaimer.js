import Head from 'next/head';
import { Container } from 'react-bootstrap';
import { useEffect, useState } from 'react';

import LegalDisclaimerService from '~/services/LegalDisclaimer';
export default function LegalPage() {
    const [pageContent, setContent] = useState('');

    useEffect(() => {
        (async () => {
            const content = await LegalDisclaimerService.get();
            setContent(content);
        })();
    }, []);

    return (
        <div>
            <Head>
                <title>BYOB | Legal Disclaimer</title>
            </Head>
            <Container
                dangerouslySetInnerHTML={{
                    __html: pageContent,
                }}
            ></Container>
        </div>
    );
}
