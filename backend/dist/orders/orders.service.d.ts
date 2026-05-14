import { Model } from 'mongoose';
import { OrderDocument } from './schemas/order.schema';
export declare class OrdersService {
    private orderModel;
    constructor(orderModel: Model<OrderDocument>);
    create(orderData: any): Promise<OrderDocument>;
    findAll(): Promise<OrderDocument[]>;
    findByUserId(userId: string): Promise<OrderDocument[]>;
    findById(id: string): Promise<OrderDocument | null>;
    updateStatus(id: string, status: string): Promise<OrderDocument | null>;
    updatePaymentStatus(id: string, paymentStatus: string): Promise<OrderDocument | null>;
    private generateOrderNumber;
}
