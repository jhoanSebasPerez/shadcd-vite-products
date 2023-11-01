import { useContext } from 'react';
import { AppContext } from '@/context/AppContext';
import { columns} from './columns';
import { DataTable } from './data-table';


export default function Products() {
    const {products} = useContext(AppContext);

    return (
        
          <DataTable columns={columns} data={products} />
      )

}