import { createContext, useContext, useState, useCallback } from 'react';
import { createPortal } from 'react-dom';
import { AnimatePresence } from 'framer-motion';
import Toast from '../components/Toast';

const NotificationContext = createContext();

export const useNotification = () => useContext(NotificationContext);

export const NotificationProvider = ({ children }) => {
    const [notifications, setNotifications] = useState([]);

    const addNotification = useCallback((message, type = 'info', title) => {
        const id = Date.now();
        setNotifications(prev => [...prev, { id, message, type, title }]);
    }, []);

    const removeNotification = useCallback((id) => {
        setNotifications(prev => prev.filter(notif => notif.id !== id));
    }, []);

    return (
        <NotificationContext.Provider value={{ addNotification }}>
            {children}
            {createPortal(
                <div className="fixed bottom-4 right-4 z-[200] flex flex-col gap-2 pointer-events-none">
                    <AnimatePresence mode="popLayout">
                        {notifications.map(notif => (
                            <Toast
                                key={notif.id}
                                message={notif.message}
                                type={notif.type}
                                title={notif.title}
                                onClose={() => removeNotification(notif.id)}
                            />
                        ))}
                    </AnimatePresence>
                </div>,
                document.body
            )}
        </NotificationContext.Provider>
    );
};
