import { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Table, Thead, Tbody, Tr, Th, Td, Button, IconButton, Flex, Box } from '@chakra-ui/react';
import { AddIcon, EditIcon, CheckIcon } from '@chakra-ui/icons';
import SaleOrderModal from './SaleOrderModal';
import { completeOrder } from './Store/saleSlice';

const SaleOrderList = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [selectedOrder, setSelectedOrder] = useState(null);
    const [showActiveOrders, setShowActiveOrders] = useState(true);
    const dispatch = useDispatch();
    const activeOrders = useSelector(state => state.saleOrders.active);
    const completedOrders = useSelector(state => state.saleOrders.completed);

    const handleAddOrder = () => {
        setSelectedOrder(null);
        setIsOpen(true);
    };

    const handleEditOrder = (order) => {
        setSelectedOrder(order);
        setIsOpen(true);
    };

    const handleCompleteOrder = (order) => {
        dispatch(completeOrder(order));
    };

    const handleShowActiveOrders = () => {
        setShowActiveOrders(true);
    };

    const handleShowCompletedOrders = () => {
        setShowActiveOrders(false);
    };

    return (
        <>
            <Box p={4}>
                <Flex 
                    justifyContent={{ base: 'center', md: 'space-between' }}
                    alignItems="center" 
                    flexDirection={{ base: 'column', md: 'row' }} 
                    mb={4}
                    gap={2} 
                >
                    <Flex justifyContent="center" alignItems="center" flexDirection={{ base: 'column', md: 'row' }} gap={2}>
                        <Button variant="outline" onClick={handleShowActiveOrders}>Active Sale Orders</Button>
                        <Button variant="outline" onClick={handleShowCompletedOrders}>Completed Sale Orders</Button>
                    </Flex>
                    <Button leftIcon={<AddIcon />} onClick={handleAddOrder} mt={{ base: 4, md: 0 }}>Sale Order</Button>
                </Flex>
            </Box>
            <Box p={4} overflowX="auto">
                {showActiveOrders ? (
                    <Table variant="simple" size="sm" minWidth="600px">
                        <Thead>
                            <Tr>
                                <Th>Customer Name</Th>
                                <Th>Invoice Date</Th>
                                <Th>Actions</Th>
                            </Tr>
                        </Thead>
                        <Tbody>
                            {activeOrders.map((order) => (
                                <Tr key={order.id}>
                                    <Td>{order.customerName}</Td>
                                    <Td>{new Date(order.invoiceDate).toLocaleDateString()}</Td>
                                    <Td>
                                        <IconButton icon={<EditIcon />} onClick={() => handleEditOrder(order)} />
                                        <IconButton icon={<CheckIcon />} onClick={() => handleCompleteOrder(order)} ml={2} />
                                    </Td>
                                </Tr>
                            ))}
                        </Tbody>
                    </Table>
                ) : (
                    <Table variant="simple" size="sm" minWidth="600px">
                        <Thead>
                            <Tr>
                                <Th>Customer Name</Th>
                                <Th>Invoice Date</Th>
                                <Th>Actions</Th>
                            </Tr>
                        </Thead>
                        <Tbody>
                            {completedOrders.map((order) => (
                                <Tr key={order.id}>
                                    <Td>{order.customerName}</Td>
                                    <Td>{new Date(order.invoiceDate).toLocaleDateString()}</Td>
                                    <Td>
                                        <IconButton icon={<EditIcon />} onClick={() => handleEditOrder(order)} isDisabled />
                                    </Td>
                                </Tr>
                            ))}
                        </Tbody>
                    </Table>
                )}
            </Box>
            <SaleOrderModal isOpen={isOpen} onClose={() => setIsOpen(false)} order={selectedOrder} />
        </>
    );
};

export default SaleOrderList;
