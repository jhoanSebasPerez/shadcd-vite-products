import * as React from 'react'
import {
    ColumnDef,
    flexRender,
    getCoreRowModel,
    useReactTable,
    SortingState,
    getSortedRowModel,
  } from "@tanstack/react-table"
   
  import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
  } from "@/components/ui/table"

import { AppContext } from '@/context/AppContext';
import { SkeletonDemo } from '../skeleton/SkeletonDemo';

  interface DataTableProps<TData, TValue> {
    columns: ColumnDef<TData, TValue>[]
    data: TData[]
  }

  export function DataTable<TData, TValue>({
    columns,
    data,
  }: DataTableProps<TData, TValue>) {

    const [sorting, setSorting] = React.useState<SortingState>([])
    const {isFetching} = React.useContext(AppContext);


    const table = useReactTable({
      data,
      columns,
      getCoreRowModel: getCoreRowModel(),
      onSortingChange: setSorting,
      getSortedRowModel: getSortedRowModel(),
      state: {
        sorting,
      },
    })
   
    return (
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead key={header.id}>
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                            header.column.columnDef.header,
                            header.getContext()
                          )}
                    </TableHead>
                  )
                })}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {
              !!isFetching && (
                <TableRow>
                  <TableCell>
                    <SkeletonDemo />
                  </TableCell>
                  <TableCell>
                    <SkeletonDemo />
                  </TableCell>
                  <TableCell>
                    <SkeletonDemo />
                  </TableCell>
                  <TableCell>
                    <SkeletonDemo />
                  </TableCell>
                </TableRow>
              )
              
            }

            {!isFetching && table.getRowModel().rows?.length && (
              table.getRowModel().rows.map((row) => (
                <TableRow
                  key={row.id}
                  data-state={row.getIsSelected() && "selected"}
                >
                  {isFetching && (<span></span>)}
                  {!isFetching && row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>
                      {flexRender(cell.column.columnDef.cell, cell.getContext())}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            )}

            {!isFetching && table.getRowModel().rows?.length == 0 && 
              (
                <TableRow>
                  <TableCell colSpan={columns.length} className="h-24 text-center">
                    {!isFetching && "No results."}
                  </TableCell>
                </TableRow>
              )
            }
          </TableBody>
        </Table>
      </div>
    )
  }