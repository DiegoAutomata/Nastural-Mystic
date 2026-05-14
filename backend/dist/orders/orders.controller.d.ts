import { OrdersService } from './orders.service';
export declare class OrdersController {
    private ordersService;
    constructor(ordersService: OrdersService);
    create(orderData: any): Promise<import("./schemas/order.schema").OrderDocument>;
    findAll(): Promise<import("./schemas/order.schema").OrderDocument[]>;
    findByUser(userId: string): Promise<import("./schemas/order.schema").OrderDocument[]>;
    findOne(id: string): Promise<import("./schemas/order.schema").OrderDocument | null>;
    updateStatus(id: string, body: {
        status: string;
    }): Promise<import("./schemas/order.schema").OrderDocument | null>;
    updatePaymentStatus(id: string, body: {
        paymentStatus: string;
    }): Promise<import("./schemas/order.schema").OrderDocument | null>;
}
