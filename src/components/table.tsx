import { useTable, useSortBy } from "react-table";

export type TColumns = {
  Header: string;
  accessor: keyof TData;
};

export type TData = {
  select: JSX.Element;
  title: string;
  video: JSX.Element;
  id: string;
};

export default function Table({
  columns,
  data,
}: {
  columns: TColumns[];
  data: TData[];
}) {
  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } =
    useTable(
      {
        columns,
        data,
      },
      useSortBy
    );

  return (
    <div className="sticky top-0 w-full h-full overflow-auto border border-black drop-shadow-[0_5px_5px_rgba(0,0,0,0.25)]">
      <table
        className="sticky top-0 table-auto w-full text-center drop-shadow-[0_5px_5px_rgba(0,0,0,0.25)]"
        {...getTableProps()}
      >
        <thead>
          {headerGroups.map((headerGroup) => (
            <tr
              className=" sticky top-0 bg-lightgrey z-10"
              {...headerGroup.getHeaderGroupProps()}
            >
              {headerGroup.headers.map((column) => (
                <th
                  className="sticky top-0 px-4 py-2 bg-lightgrey"
                  {...column.getHeaderProps()}
                >
                  {column.render("Header")}
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody {...getTableBodyProps()}>
          {rows.map((row) => {
            prepareRow(row);
            return (
              <tr className="hover:bg-gray-100" {...row.getRowProps()}>
                {row.cells.map((cell) => {
                  return (
                    <td className="px-4 py-2" {...cell.getCellProps()}>
                      {cell.render("Cell")}
                    </td>
                  );
                })}
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
