import { Link } from 'react-router-dom';
import { Segment } from 'semantic-ui-react';

export function LinkSegment(props) {
    const { children, ...rest } = props;
    return (
        <Segment>
            <Link {...rest}>
                    {children}
            </Link>
        </Segment>
    );
}
