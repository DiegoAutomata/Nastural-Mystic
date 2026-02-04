const { MercadoPagoConfig, Preference } = require('mercadopago');
const sendEmail = require('../utils/sendEmail');

// Initialize with Access Token (Use env variable in production)
// For now using a placeholder or test token. 
// User needs to provide their real ACCESS_TOKEN in .env
const client = new MercadoPagoConfig({ accessToken: process.env.MP_ACCESS_TOKEN || 'TEST-4886237887768228-020412-f04646700028886315201886-1667676767' });

// @desc    Create a payment preference
// @route   POST /api/payment/create_preference
// @access  Public (or Private if we force auth)
const createPreference = async (req, res) => {
    try {
        const { items, payer } = req.body;

        if (!items || items.length === 0) {
            return res.status(400).json({ message: 'No items in the request' });
        }

        const body = {
            items: items.map(item => ({
                title: item.title,
                quantity: Number(item.quantity),
                unit_price: Number(item.unit_price),
                currency_id: 'ARS', // Argentina Peso
            })),
            back_urls: {
                success: 'http://localhost:5173/success', // Frontend success page
                failure: 'http://localhost:5173/failure',
                pending: 'http://localhost:5173/pending',
            },
            auto_return: 'approved',
            payer: {
                name: payer?.name || 'Guest',
                email: payer?.email || 'test_user@test.com'
            }
        };

        const preference = new Preference(client);
        const result = await preference.create({ body });

        // Optional: Send "Pending" email here if desired, or wait for webhook
        // For now, we trust the flow.

        res.json({ id: result.id });

    } catch (error) {
        console.error("Mercado Pago Error:", error);
        res.status(500).json({ message: "Error creating payment preference" });
    }
};

// @desc    Confirm order manually (Transfer/Cash) and send email
// @route   POST /api/payment/confirm_order
// @access  Public
const confirmOrder = async (req, res) => {
    try {
        const { orderDetails, userEmail, paymentMethod } = req.body;

        const subject = `Confirmación de Pedido - ${paymentMethod === 'transfer' ? 'Esperando Transferencia' : 'Confirmado'}`;

        const message = `
            <div style="font-family: Arial, sans-serif; padding: 20px; color: #333;">
                <h1 style="color: #6d28d9;">¡Gracias por tu compra!</h1>
                <p>Tu pedido ha sido registrado exitosamente.</p>
                
                <h3>Detalles del Pedido:</h3>
                <ul>
                    ${orderDetails.map(item => `<li>${item.name} x${item.quantity} - $${item.price}</li>`).join('')}
                </ul>
                
                <p><strong>Total: $${orderDetails.reduce((acc, item) => acc + item.price * item.quantity, 0)}</strong></p>
                
                ${paymentMethod === 'transfer' ? `
                    <div style="background: #f3e8ff; padding: 15px; border-radius: 8px; margin-top: 20px;">
                        <h3 style="margin-top:0;">Datos para Transferencia:</h3>
                        <p>Banco Santander<br>CBU: 0000003100044883311122<br>Alias: SOL.TIENDA.MP</p>
                        <p><em>Por favor responde a este correo con el comprobante.</em></p>
                    </div>
                ` : ''}

                <p style="margin-top: 30px; font-size: 12px; color: #888;">Si tienes alguna duda, contáctanos.</p>
            </div>
        `;

        try {
            await sendEmail({
                email: userEmail,
                subject: subject,
                message: message
            });
            res.status(200).json({ success: true, message: 'Email sent' });
        } catch (emailError) {
            console.error("Email send failed:", emailError);
            // Don't fail the whole request if email fails, just warn
            res.status(200).json({ success: true, warning: 'Order created but email failed' });
        }

    } catch (error) {
        console.error("Confirm Order Error:", error);
        res.status(500).json({ message: "Error confirming order" });
    }
};

module.exports = { createPreference, confirmOrder };
