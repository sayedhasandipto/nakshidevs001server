import { Router, Request, Response } from 'express';
import User from '../models/User';
import Service from '../models/Service';
import Order from '../models/Order';

const router = Router();

// GET /api/admin/stats
router.get('/stats', async (req: Request, res: Response) => {
  try {
    const totalUsers = await User.countDocuments();
    const activeServices = await Service.countDocuments({ status: 'Active' });
    const totalOrders = await Order.countDocuments();
    
    // Calculate total revenue (assuming amount is stored as a string with $ sign or parseable number)
    // For simplicity, returning a placeholder or basic sum if structured correctly.
    // We will just return a placeholder for monthly revenue for now.
    const revenue = '$24,500';

    res.json({
      success: true,
      data: [
        { title: 'Total Users', value: totalUsers.toString(), change: '+12%', color: 'text-blue-500', bg: 'bg-blue-500/10' },
        { title: 'Active Services', value: activeServices.toString(), change: '+5%', color: 'text-indigo-500', bg: 'bg-indigo-500/10' },
        { title: 'Total Orders', value: totalOrders.toString(), change: '+23%', color: 'text-rose-500', bg: 'bg-rose-500/10' },
        { title: 'Monthly Revenue', value: revenue, change: '+18%', color: 'text-emerald-500', bg: 'bg-emerald-500/10' },
      ]
    });
  } catch (error) {
    res.status(500).json({ success: false, error: 'Server error fetching stats' });
  }
});

// GET /api/admin/users
router.get('/users', async (req: Request, res: Response) => {
  try {
    const users = await User.find().sort({ joinedAt: -1 });
    res.json({ success: true, data: users });
  } catch (error) {
    res.status(500).json({ success: false, error: 'Server error fetching users' });
  }
});

// GET /api/admin/services
router.get('/services', async (req: Request, res: Response) => {
  try {
    const services = await Service.find().sort({ createdAt: -1 });
    res.json({ success: true, data: services });
  } catch (error) {
    res.status(500).json({ success: false, error: 'Server error fetching services' });
  }
});

// GET /api/admin/orders
router.get('/orders', async (req: Request, res: Response) => {
  try {
    const orders = await Order.find().sort({ orderDate: -1 });
    res.json({ success: true, data: orders });
  } catch (error) {
    res.status(500).json({ success: false, error: 'Server error fetching orders' });
  }
});

export default router;
