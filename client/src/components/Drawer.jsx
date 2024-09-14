import { Button, Drawer } from "flowbite-react";
import { useState } from "react";

export default function CartDrawer({ open, setIsOpen }) {
  const handleClose = () => setIsOpen(false);

  return (
    <Drawer open={open} onClose={handleClose} position="right" >
      <Drawer.Header title="" titleIcon={() => <></>}  />
      <Drawer.Items>
        <h1 className="text-xl font-semibold py-4">Carro de Compras</h1>
        <p className="mb-6 text-sm text-gray-500 dark:text-gray-400">
          Supercharge your hiring by taking advantage of our&nbsp;
          <a
            href="#"
            className="text-cyan-600 underline hover:no-underline dark:text-cyan-500"
          >
            limited-time sale
          </a>
          &nbsp;for Flowbite Docs + Job Board. Unlimited access to over 190K
          top-ranked candidates and the #1 design job board.
        </p>
        <div className="flex flex-col mx-auto gap-2">
        <Button color="blue">Carro de Compras</Button>
        <Button color="blue">Finalizar Compra</Button>
        </div>
      </Drawer.Items>
    </Drawer>
  );
}
