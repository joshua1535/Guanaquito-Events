import React from "react";
import { Avatar, Button, Card, CardBody, CardHeader, Typography } from "@material-tailwind/react";

const TABLE_HEAD = ["Evento", "Fecha", "Localidad", "Precio", "Total"];


export default function OrderTable({ orders }) {

    const TABLE_ROWS = orders.map((order, index) => ({
        numeroOrden: order.orderCode,
        fechaOrden: order.orderDate,
        total: order.totalOrder,
        tickets: order.tickets.map(ticket => ({
            evento: ticket.eventTitle,
            fecha: ticket.eventDate,
            hora: ticket.eventTime,
            localidad: ticket.ticketTier,
            precio: ticket.ticketPrice,
            img: ticket.eventPicture,
        })),
    }));

    return (
        <>
            {TABLE_ROWS.map((order, index) => {
                const total = order.tickets.reduce((total, ticket) => total + ticket.precio, 0);
                const isLast = index === TABLE_ROWS.length - 1;
                const classes = isLast ? "p-4" : "p-4 border-b border-blue-gray-50";

                return (
                    <Card className="h-full w-2/3 m-auto mt-5 border-2 border-dark-blue shadow-lg rounded-[10px] md:overflow-auto" key={index}>
                        <CardHeader floated={false} className="rounded-md outline-double p-3">
                            <div className="mb-4 flex flex-col justify-between gap-8 md:flex-row md:items-center">
                                <div>
                                    <Typography variant="h5" className='text-blueCapas'>
                                        Orden #{order.numeroOrden}
                                    </Typography>
                                    <Typography color="gray" className="mt-1 font-normal">
                                        Fecha: {order.fechaOrden}
                                    </Typography>
                                </div>
                            </div>
                        </CardHeader>
                        <CardBody className="overflow-scroll px-0">
                            <table className="w-full min-w-max table-auto text-left">
                                <thead>
                                    <tr>
                                        {TABLE_HEAD.map((head) => (
                                            <th key={head} className="border-b border-blue-gray-100 bg-blue-gray-50 p-4">
                                                <Typography
                                                    variant="small"
                                                    className="font-normal leading-none text-blueCapas"
                                                >
                                                    {head}
                                                </Typography>
                                            </th>
                                        ))}
                                    </tr>
                                </thead>
                                <tbody>
                                    {order.tickets.map((ticket, ticketIndex) => (
                                        <tr key={ticketIndex}>
                                            <td className={classes}>
                                                <div className="flex items-center gap-4">
                                                    <Avatar src={ticket.img} />
                                                    <Typography variant="small" color="blue-gray" className="font-bold">
                                                        {ticket.evento}
                                                    </Typography>
                                                </div>
                                            </td>
                                            <td className={`${classes} bg-blue-gray-50/50`}>
                                                <Typography variant="small" color="blue-gray" className="font-normal">
                                                    {ticket.fecha}
                                                </Typography>
                                            </td>
                                            <td className={classes}>
                                                <Typography variant="small" color="blue-gray" className="font-normal">
                                                    {ticket.localidad}
                                                </Typography>
                                            </td>
                                            <td className={`${classes} bg-blue-gray-50/50`}>
                                                <Typography variant="small" color="blue-gray" className="font-normal">
                                                    ${ticket.precio}
                                                </Typography>
                                            </td>
                                        </tr>
                                    ))}
                                    <tr>
                                        <td className="p-4" colSpan={TABLE_HEAD.length - 1}></td>
                                        <td className="p-4">
                                            <Typography variant="small" color="blue-gray" className="font-bold">
                                                ${total}
                                            </Typography>
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                        </CardBody>
                    </Card>
                );
            })}
        </>
    );
}