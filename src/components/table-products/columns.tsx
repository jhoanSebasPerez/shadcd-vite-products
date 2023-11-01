import { ColumnDef } from "@tanstack/react-table"
import { UUID } from 'crypto'
import { faPenToSquare } from '@fortawesome/free-solid-svg-icons'
import { Button } from '@/components/ui/button'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { AppContext } from '@/context/AppContext';
import { ArrowUpDown } from "lucide-react"
import { useContext} from 'react'
import { AlertDialogDemo } from '../alert-dialog/AlertDialog';


export type Product = {
  id: UUID
  name: string
  price: number
  description: string
}

const Actions : React.FC = (row) =>{ 

  const {handleTrigger, setIdProduct} = useContext(AppContext);

  const id = row.getValue("id")
  const name = row.getValue("name")

  const handleClick = () => {
    setIdProduct(id);
    handleTrigger();
  }


  return (
            <div className="flex gap-4">
              <Button className='bg-sky-500 hover:bg-sky-700' onClick={handleClick}><FontAwesomeIcon icon={faPenToSquare} /></Button>
              
              <AlertDialogDemo productName={name} idProduct={id}/>

              
            </div>
      );
}


export const columns: ColumnDef<Product>[] = [
    { 
      accessorKey: "id",
      header: () => <span className='font-black'>Id</span>,
      cell: ({ row }) => {
        const id = row.getValue("id")
        return <div className="font-medium">{id}</div>
      },
    },
    {
      accessorKey: "name",
      header: ({ column }) => {
        return (
          <Button
            className='justify-between p-0'
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            <span className='font-black'>Name</span>
            <ArrowUpDown className="ml-2 h-4 w-4" />
          </Button>
        )
      },
    },
    {
      accessorKey: "price",
      header: ({ column }) => {
        return (
          <Button
            className='justify-between p-0'
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            <span className='font-black'>Price</span>
            <ArrowUpDown className="ml-2 h-4 w-4" />
          </Button>
        )
      },
      cell: ({ row }) => {
        const amount = parseFloat(row.getValue("price"))
        const formatted = new Intl.NumberFormat("en-US", {
          style: "currency",
          currency: "USD",
        }).format(amount)
   
        return <div className="font-medium">{formatted}</div>
      }
  
    },
    {
      accessorKey: "description",
      header: () => <span className='font-black'>Description</span>,
    },
    {
      id: "actions",
      cell: ({row}) => Actions(row),
    },

  ]