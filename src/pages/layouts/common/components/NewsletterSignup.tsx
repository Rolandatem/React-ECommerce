import { useContext } from 'react';
import Form from 'react-bootstrap/Form';
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import Button from 'react-bootstrap/Button';
import { NewsletterContext } from '@/tools/contexts';

/**
 * Newsletter component used in both mobile and non-mobile footer.
 */
const NewsletterSignup = () => {
    const newsletterContext = useContext(NewsletterContext);

    //===========================================================================================================================
    return (
        <Form onSubmit={newsletterContext?.joinNewsletter}>
            <div>Join our Newsletter!</div>
            <Form.Group controlId="newsletterEmail" className="mt-2">
                <FloatingLabel controlId="newLetterFloating" label="Email Address">
                    <Form.Control required type="email" placeholder="Email Address" name="newsletterEmail" value={newsletterContext?.email.getter} onChange={(e) => newsletterContext?.email.setter(e.target.value)} />
                </FloatingLabel>
                <Form.Text className="text-muted">
                    We'll never share your email with anyone.
                </Form.Text>
            </Form.Group>
            <Button type="submit" className="bg-secondary mt-2">
                Join!
            </Button>
        </Form>
    )
}

export default NewsletterSignup;