import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Skeleton } from "@/components/ui/skeleton"
import { useToast } from "@/components/ui/use-toast"
import { AppContext } from '@/context/AppContext'

import { useContext, useEffect, useState } from 'react'

export default function FormDialog() {
    const { toast } = useToast()

    const {trigger, handleTrigger, getProduct, idProduct, updateProduct} = useContext(AppContext)
    const [product, setProduct] = useState({name: "", price: 0, description: ""});
    const [loading, setLoading] = useState(true);
    
    useEffect(() => {
        const fetchProduct = async() => {
            if(idProduct){
                const data = await getProduct(idProduct);
                setProduct(data);
                setTimeout(() => {
                    setLoading(false);
                } , 100);
            }
        }
        
        fetchProduct()

        return () => {
            setProduct({name: "", price: 0, description: ""});
            setLoading(true);
        }
    }, [getProduct, idProduct]);


    const handleSubmit = async() => {
        handleTrigger();
        const response = await updateProduct({id: idProduct, ...product});
        

        let message = ""
        response.status === 200 ? message = "Product updated successfully" : message = "Error updating product";

        toast({
            title: message,
            variant: response.status != 200 ? "destructive" : "default",
        })
    }

    return (
        <Dialog open={trigger} onOpenChange={handleTrigger}>
            <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Edit product</DialogTitle>
          <DialogDescription>
            Make changes to product here. Click save when you're done.
          </DialogDescription>
        </DialogHeader>
        {loading ? (
            <div className="my-3 flex flex-col gap-3">
                <div className="flex w-full gap-8">
                    <Skeleton className="w-1/4 h-8" />
                    <Skeleton className="w-3/4 h-8" />
                </div>
                <div className="flex w-full gap-8">
                    <Skeleton className="w-1/4 h-8" />
                    <Skeleton className="w-3/4 h-8" />
                </div>
                <div className="flex w-full gap-8">
                    <Skeleton className="w-1/4 h-8" />
                    <Skeleton className="w-3/4 h-8" />
                </div>
          </div>

        ) :  (
            <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="name" className="text-right">
                Name
              </Label>
              <Input id="name" value={product.name} className="col-span-3" onChange={(e) => {setProduct({...product, name: e.target.value})}}/>
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="username" className="text-right">
                Price
              </Label>
              <Input id="username" value={product.price} className="col-span-3" onChange={(e) => {setProduct({...product, price: Number( e.target.value)})}}/>
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="username" className="text-right">
                Description
              </Label>
              <Input id="username" value={product.description} className="col-span-3" onChange={(e) => {setProduct({...product, description: e.target.value})}}/>
            </div>
          </div>
        )}
        <DialogFooter>
          <Button type="submit" disabled={loading} onClick={handleSubmit}>Save changes</Button>
        </DialogFooter>
      </DialogContent>
        </Dialog>
    )
}