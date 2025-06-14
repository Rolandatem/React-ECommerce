import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import { useNavigate } from 'react-router-dom';
import type IShopByCategoryDemoModal from '@/tools/interfaces/IShopByCategoryDemoModal';

/**
 * Modal letting the user know that only the 'All Flooring' category
 * is allowed.
 */
const ShopByCategoryDemoModal = (props: IShopByCategoryDemoModal) => {
    //===========================================================================================================================
    const navigate = useNavigate();

    //===========================================================================================================================
    return (
        <Modal show={props.isVisible} centered size="lg" onHide={() => props.setIsVisible(false)}>
            <Modal.Header closeButton>
                <Modal.Title>Demo Category List Page</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <p>
                    Sorry, but to keep this demo small the available option is to use the
                    'All Flooring' category option.
                </p>
                <div className="d-flex justify-content-center w-100">
                    <Button variant="secondary" onClick={() => navigate('/product/all')}>
                        All Flooring Category List Page
                    </Button>
                </div>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={() => props.setIsVisible(false)}>Close</Button>
            </Modal.Footer>
        </Modal>
    )
}

export default ShopByCategoryDemoModal;