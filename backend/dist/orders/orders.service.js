"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.OrdersService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const order_schema_1 = require("./schemas/order.schema");
let OrdersService = class OrdersService {
    orderModel;
    constructor(orderModel) {
        this.orderModel = orderModel;
    }
    async create(orderData) {
        const orderNumber = this.generateOrderNumber();
        const newOrder = new this.orderModel({
            ...orderData,
            orderNumber,
        });
        return newOrder.save();
    }
    async findAll() {
        return this.orderModel.find().sort({ createdAt: -1 }).exec();
    }
    async findByUserId(userId) {
        return this.orderModel.find({ userId }).sort({ createdAt: -1 }).exec();
    }
    async findById(id) {
        return this.orderModel.findById(id).exec();
    }
    async updateStatus(id, status) {
        return this.orderModel.findByIdAndUpdate(id, { status }, { new: true }).exec();
    }
    async updatePaymentStatus(id, paymentStatus) {
        return this.orderModel.findByIdAndUpdate(id, { paymentStatus }, { new: true }).exec();
    }
    generateOrderNumber() {
        const timestamp = Date.now().toString(36).toUpperCase();
        const random = Math.random().toString(36).substring(2, 6).toUpperCase();
        return `NM-${timestamp}-${random}`;
    }
};
exports.OrdersService = OrdersService;
exports.OrdersService = OrdersService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)(order_schema_1.Order.name)),
    __metadata("design:paramtypes", [mongoose_2.Model])
], OrdersService);
//# sourceMappingURL=orders.service.js.map