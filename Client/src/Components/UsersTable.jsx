import React, { useState, useEffect } from "react";
import { Card, CardBody, Avatar, Typography, Chip, IconButton, Tooltip, CardFooter } from "@material-tailwind/react";
import { PencilIcon } from "@heroicons/react/24/solid";
import { permitService } from "../Services/permitService";
import { useUserContext } from "../Context/userContext";

const TABLE_HEAD = ["Usuario", "Roles", "Estado", "Registrado desde", ""];

export default function UsersTable({ users, navigate }) {
    const { token } = useUserContext();

    const handleEdit = (code) => {
        const userCode = code;
        navigate(`/admin-users/permits-user/${userCode}`);

    };

    useEffect(() => {
        if (token) {
            users.forEach((user) => {
                permitService
                    .getPermitsByUser(user.code, token)
                    .then((data) => {
                        setPermits((prevPermits) => [...prevPermits, { userCode: user.code, permits: data }]);
                        console.log(`Los permisos de usuario ${user.code} obtenidos:`, data);
                    })
                    .catch((error) => {
                        console.error(`Hubo un error al obtener los permisos de usuario ${user.code}:`, error);
                    });
            });
        }
    }, [users, token]);

    const TABLE_ROWS = users.map((user) => ({
        code: user.code,
        profilePicture: user.profilePicture,
        email: user.email,
        active: user.active,
        dateAdded: user.dateAdded,
    }));

    

    const [permits, setPermits] = useState([]);

    useEffect(() => {
        // Llama a useUserContext solo una vez al principio
        if (token) {
            console.log('El token es:', token);
            // Llamada al servicio para cada usuario
            TABLE_ROWS.forEach((user) => {
                permitService
                    .getPermitsByUser(user.code, token)
                    .then((data) => {
                        setPermits((prevPermits) => [...prevPermits, { userCode: user.code, permits: data }]);
                        console.log(`Los permisos de usuario ${user.code} obtenidos:`, data);
                    })
                    .catch((error) => {
                        console.error(`Hubo un error al obtener los permisos de usuario ${user.code}:`, error);
                    });
            });
        }
    }, [users, token]); // Solo se ejecuta cuando TABLE_ROWS cambia


    return (

        <Card className="flex justify-start w-full rounded-none bg-transparent shadow-none font-text">
            <CardBody className="overflow-auto px-0">

                <table className="mt-4 w-full min-w-max table-auto text-left">
                    <thead>
                        <tr >
                            <th className="p-4 border-y border-blue-gray-100 sticky left-0 Mobile-390*844:w-6 Mobile-280:w-2 PC-640*480:w-14 bg-blue-gray-200 ">
                                <Typography
                                    color="blue-gray"
                                    className="text-base Mobile-390*844:text-sm Mobile-280:text-xs"
                                >
                                    {TABLE_HEAD[0]}
                                </Typography>
                            </th>
                            {TABLE_HEAD.slice(1).map((head) => (
                                <th key={head} className="border-y border-blue-gray-100 bg-blue-gray-200 p-4 text-left">
                                    <Typography
                                        color="blue-gray"
                                        className="text-base Mobile-390*844:text-sm Mobile-280:text-xs"
                                    >
                                        {head}
                                    </Typography>
                                </th>
                            ))}
                        </tr>
                    </thead>
                    <tbody>
                        {TABLE_ROWS.map(({ code, profilePicture, email, active, dateAdded }) => {


                            const isLast = TABLE_ROWS[TABLE_ROWS.length - 1].email === email;
                            //Si es el primer elemento de la tabla que sea sticky
                            const classes = isLast ? "p-4" : "p-4 border-b border-blue-gray-50 ";
                            const firstElement = isLast ? "p-4 sticky left-0 Mobile-390*844:w-6 Mobile-280:w-4 PC-640*480:w-14 bg-blueCapas Mobile-280:p-0"
                                : "p-4 border-b border-blue-gray-50 sticky left-0 Mobile-390*844:w-6 Mobile-280:w-4 PC-640*480:w-14 bg-blueCapas Mobile-280:p-0"


                            // Filtrar los permisos del usuario actual
                            const userPermits = permits.find((p) => p.userCode === code)?.permits || [];

                            return (
                                <tr key={email}>
                                    <td className={firstElement}>
                                        <div className="flex items-center gap-3 Mobile-390*844:gap-0 Mobile-280:gap-0 break-words ">
                                            <Avatar src={profilePicture} alt={email} size="md" className="Mobile-390*844:hidden Mobile-280:hidden" />
                                            <div className="flex flex-col">
                                                <Typography className="text-white text-base Mobile-390*844:text-xs Mobile-280:text-xs PC-640*480:text-sm">
                                                    {email}
                                                </Typography>
                                            </div>
                                        </div>
                                    </td>
                                    {
                                        <td className={classes}>
                                            <div className="flex items-center gap-2">
                                                {userPermits.map((permit) => (
                                                    <p
                                                        key={permit.name}
                                                        className="bg-blue-gray-100 text-black rounded-full px-3 py-2 text-xs"
                                                    >
                                                        {permit.name}
                                                    </p>
                                                ))}
                                            </div>
                                        </td>
                                    }
                                    <td className={classes}>
                                        <div className="w-max">
                                            <Chip
                                                variant="gradient"
                                                size="sm"
                                                value={active === true ? "Habilitado" : "Deshabilitado"}
                                                color={active === true ? "green" : "blue-gray"}
                                                className="static"
                                            />
                                        </div>
                                    </td>
                                    <td className={classes}>
                                        <Typography variant="small" color="white" className="font-normal">
                                            {dateAdded}
                                        </Typography>
                                    </td>
                                    <td className={classes}>
                                        <Tooltip content="Edit User">
                                            <IconButton variant="text" className="text-yellowCapas">
                                                <PencilIcon onClick={() => handleEdit(code)} className="h-6 w-6" />
                                            </IconButton>
                                        </Tooltip>
                                    </td>
                                </tr>
                            );
                        })}
                    </tbody>
                </table>
            </CardBody>
            <CardFooter className="flex items-center justify-between border-t border-blue-gray-50 p-4">

            </CardFooter>
        </Card>
    );
}
