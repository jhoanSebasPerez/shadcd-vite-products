import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"
import { faPlus } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Textarea } from "@/components/ui/textarea"
import {useState, useContext} from 'react'
import { AppContext } from '@/context/AppContext';
import { useToast } from "@/components/ui/use-toast"
 
export function CreateDialog() {

    const {createProduct} = useContext(AppContext);
    const {toast} = useToast();

    const [name, setName] = useState("");
    const [price, setPrice] = useState(0);
    const [description, setDescription] = useState("");

    const handleSubmit = async() => {
        //e.preventDefault();
        const product = {name, price, description};
        const response = await createProduct(product);

        let message = ""
        response.status === 201 ? message = "Product created successfully" : message = "Error creating product";

        toast({
            title: message,
            variant: response.status != 201 ? "destructive" : "default",
        })

        setName("");
        setPrice(0);
        setDescription("");
        
    }

  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button className='mb-4'> <FontAwesomeIcon icon={faPlus} className='mr-2'/>Create new product</Button>
      </SheetTrigger>
      <SheetContent>
        <SheetHeader>
          <SheetTitle>Add new product</SheetTitle>
          <SheetDescription>
            Create a new product. Click save when you're done.
          </SheetDescription>
        </SheetHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="name" className="text-right">
              Name
            </Label>
            <Input id="name" value={name} className="col-span-3" onChange={(e) => setName(e.target.value)}/>
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="username" className="text-right">
              Price
            </Label>
            <Input id="username" value={price} className="col-span-3" onChange={(e) => setPrice(Number(e.target.value))}/>
          </div>
          <div className="grid grid-cols-4 gap-4">
            <Label htmlFor="username" className="text-right mt-2">
              Description
            </Label>
            <Textarea id="username" value={description} className="col-span-3" onChange={(e) => setDescription(e.target.value)}/>
          </div>
        </div>
        <SheetFooter>
          <SheetClose asChild>
            <Button type="submit" disabled={!(name && price && description)} onClick={handleSubmit}>Save changes</Button>
          </SheetClose>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  )
}