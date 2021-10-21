import { Button, Container, Header } from 'semantic-ui-react';

import { Link } from 'react-router-dom';
import React from 'react';
import { config } from '../config';

export class LegalInfosPage extends React.PureComponent {
    render() {
        return (
            <div>
                <br/>
                <Button
                    as={Link}
                    to='/'
                    content="Zur Startseite"
                    icon='chevron left'
                    fluid
                />
                <br/>
                <Container>
                    <Header as='h1'>
                        Impressum
                    </Header>
                    <div dangerouslySetInnerHTML={ {__html: config.HTML_CONTACT_INFOS } } />
                    <br/>
                    <Header as='h1'>
                        Nutzungsbedingungen / Datenschutz
                    </Header>
                    <div dangerouslySetInnerHTML={ {__html: config.HTML_TERMS_OF_SERVICE } } />
                </Container>
            </div>
        )
    }
}
