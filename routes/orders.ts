import { Router, Request, Response } from 'express';
import Order from '../models/Order';

const router = Router();

// POST /api/orders
// Create a new order
router.post('/', async (req: Request, res: Response) => {
  try {
    const { customerName, customerEmail, serviceName, amount } = req.body;

    if (!customerEmail || !serviceName || !amount) {
      return res.status(400).json({ success: false, error: 'Missing required fields' });
    }

    // Generate a unique order ID
    const count = await Order.countDocuments();
    const orderId = `ORD-${new Date().getFullYear()}-${(count + 1).toString().padStart(3, '0')}`;

    const newOrder = new Order({
      orderId,
      customerName: customerName || 'Anonymous',
      customerEmail,
      serviceName,
      amount,
      status: 'Pending',
    });

    await newOrder.save();

    res.status(201).json({ success: true, data: newOrder });
  } catch (error) {
    console.error('Error creating order:', error);
    res.status(500).json({ success: false, error: 'Failed to create order' });
  }
});

// GET /api/orders/user/:email
// Get orders for a specific user
router.get('/user/:email', async (req: Request, res: Response) => {
  try {
    const { email } = req.params;
    if (!email) {
      return res.status(400).json({ success: false, error: 'Email is required' });
    }

    const orders = await Order.find({ customerEmail: email }).sort({ orderDate: -1 });
    res.json({ success: true, data: orders });
  } catch (error) {
    console.error('Error fetching user orders:', error);
    res.status(500).json({ success: false, error: 'Failed to fetch orders' });
  }
});

export default router;
