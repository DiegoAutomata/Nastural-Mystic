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
Object.defineProperty(exports, "__esModule", { value: true });
exports.OrderSchema = exports.Order = void 0;
const mongoose_1 = require("@nestjs/mongoose");
const swagger_1 = require("@nestjs/swagger");
class OrderItem {
    productId;
    name;
    price;
    quantity;
    image;
}
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", String)
], OrderItem.prototype, "productId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", String)
], OrderItem.prototype, "name", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", Number)
], OrderItem.prototype, "price", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", Number)
], OrderItem.prototype, "quantity", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", String)
], OrderItem.prototype, "image", void 0);
class ShippingAddress {
    fullName;
    phone;
    address;
    city;
    province;
    postalCode;
}
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", String)
], ShippingAddress.prototype, "fullName", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", String)
], ShippingAddress.prototype, "phone", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", String)
], ShippingAddress.prototype, "address", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", String)
], ShippingAddress.prototype, "city", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", String)
], ShippingAddress.prototype, "province", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", String)
], ShippingAddress.prototype, "postalCode", void 0);
let Order = class Order {
    orderNumber;
    items;
    total;
    shippingAddress;
    email;
    paymentMethod;
    status;
    paymentStatus;
    userId;
    notes;
};
exports.Order = Order;
__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, mongoose_1.Prop)({ required: true }),
    __metadata("design:type", String)
], Order.prototype, "orderNumber", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, mongoose_1.Prop)({ type: [OrderItem], required: true }),
    __metadata("design:type", Array)
], Order.prototype, "items", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, mongoose_1.Prop)({ required: true }),
    __metadata("design:type", Number)
], Order.prototype, "total", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, mongoose_1.Prop)({ type: ShippingAddress, required: true }),
    __metadata("design:type", ShippingAddress)
], Order.prototype, "shippingAddress", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, mongoose_1.Prop)({ required: true }),
    __metadata("design:type", String)
], Order.prototype, "email", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, mongoose_1.Prop)({ required: true, enum: ['card', 'transfer', 'cash', 'mercadopago'] }),
    __metadata("design:type", String)
], Order.prototype, "paymentMethod", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, mongoose_1.Prop)({ default: 'pending', enum: ['pending', 'processing', 'shipped', 'delivered', 'cancelled'] }),
    __metadata("design:type", String)
], Order.prototype, "status", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, mongoose_1.Prop)({ default: 'pending', enum: ['pending', 'paid', 'failed'] }),
    __metadata("design:type", String)
], Order.prototype, "paymentStatus", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, mongoose_1.Prop)(),
    __metadata("design:type", String)
], Order.prototype, "userId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, mongoose_1.Prop)(),
    __metadata("design:type", String)
], Order.prototype, "notes", void 0);
exports.Order = Order = __decorate([
    (0, mongoose_1.Schema)({ timestamps: true })
], Order);
exports.OrderSchema = mongoose_1.SchemaFactory.createForClass(Order);
//# sourceMappingURL=order.schema.js.map