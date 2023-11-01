import FormDialog from './components/form-dialog/FormDialog';
import { AppProvider } from './context/AppContext';
import Products from './components/table-products/Products';
import { Toaster } from "@/components/ui/toaster"
import { Button } from './components/ui/button';
import { CreateDialog } from './components/create-dialog/CreateDialog';

function App() {
  

  return (
    <AppProvider>
      <div className='container mx-auto'> 

        <h1 className='text-4xl font-black mb-8 mt-8'>Products</h1>

        <CreateDialog />

        <Products />

        <FormDialog />

        <Toaster />
      </div>
    </AppProvider>
  )
}

export default App
