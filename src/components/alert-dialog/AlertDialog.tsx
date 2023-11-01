import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
  } from "@/components/ui/alert-dialog"
  import { faTrash } from '@fortawesome/free-solid-svg-icons'
  import { Button } from '@/components/ui/button'
  import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
  import { useContext } from 'react'
  import { AppContext } from '@/context/AppContext'
  import { useToast } from '../ui/use-toast'


  export function AlertDialogDemo({productName = "", idProduct = ""}) {

    const {deleteProduct} = useContext(AppContext);
    const {toast} = useToast();

    const handleDelete = async() => {
        const response = await deleteProduct(idProduct);

        let message = ""
        response.status === 200 ? message = "Product deleted successfully" : message = "Error deleting product";

        toast({
            title: message,
            variant: response.status != 200 ? "destructive" : "default",
        });
    }

    return (
      <AlertDialog>
        <AlertDialogTrigger asChild>
            <Button className='bg-red-500 hover:bg-red-700'><FontAwesomeIcon icon={faTrash} /></Button>
        </AlertDialogTrigger>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you absolutely sure to remove <span className='font-black underline underline-offset-4'>{productName}</span>?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently delete your
              account and remove your data from our servers.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction className='bg-red-500 hover:bg-red-700' onClick={handleDelete}>Continue</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    )
  }