import  { useEffect } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { useDispatch } from 'react-redux';
import { addOrder, updateOrder } from './Store/saleSlice';
import { Modal, ModalOverlay, ModalContent, ModalHeader, ModalFooter, ModalBody, ModalCloseButton, Button, FormControl, FormLabel, Input } from '@chakra-ui/react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

const SaleOrderModal = ({ isOpen, onClose, order }) => {
    const { control, handleSubmit, reset } = useForm();
    const dispatch = useDispatch();

    useEffect(() => {
        if (order) {
            reset({
                customerName: order.customerName,
                invoiceDate: `${new Date(order.invoiceDate)}`
            });
        } else {
            reset({
                customerName: '',
                invoiceDate: `${new Date()}` 
            });
        }
    }, [order, reset]);

    const onSubmit = data => {
        const processedData = {
            ...data,
            invoiceDate: `${new Date(data.invoiceDate)}`
        };

        if (order) {
            dispatch(updateOrder({ ...processedData, id: order.id }));
        } else {
            dispatch(addOrder(processedData));
        }
        onClose();
    };

    return (
        <Modal isOpen={isOpen} onClose={onClose}>
            <ModalOverlay />
            <ModalContent>
                <ModalHeader>{order ? 'Edit Sale Order' : 'Add Sale Order'}</ModalHeader>
                <ModalCloseButton />
                <ModalBody>
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <FormControl>
                            <FormLabel>Customer Name</FormLabel>
                            <Controller
                                name="customerName"
                                control={control}
                                render={({ field }) => <Input {...field} />}
                                rules={{ required: 'Customer name is required' }}
                            />
                        </FormControl>
                        <FormControl mt={4}>
                            <FormLabel>Invoice Date</FormLabel>
                            <Controller
                                name="invoiceDate"
                                control={control}
                                render={({ field }) => <DatePicker selected={field.value} onChange={field.onChange} />}
                                rules={{ required: 'Invoice date is required' }}
                            />
                        </FormControl>
                        <ModalFooter>
                            <Button colorScheme="blue" mr={3} type="submit">
                                Save
                            </Button>
                            <Button onClick={onClose}>Cancel</Button>
                        </ModalFooter>
                    </form>
                </ModalBody>
            </ModalContent>
        </Modal>
    );
};

export default SaleOrderModal;
