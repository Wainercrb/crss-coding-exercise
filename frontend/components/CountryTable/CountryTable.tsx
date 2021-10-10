import { Dispatch, SetStateAction, useState } from 'react';
import styles from './CountryTable.module.css';

type TProps = {
  data: any[];
  type: 'SIMPLE' | 'CUSTOM';
  setSortStrQuery?: Dispatch<SetStateAction<string>>;
};

type TSelectedColumn = {
  column: string;
  direc: string;
};

type TSortIconArgs = {
  width?: number;
  height?: number;
};

type TSwitchSortIconArgs = {
  columnKey?: string;
};

enum SortDirec {
  ASC = 'ASC',
  DES = 'DES',
}

const AscIcon = ({ width = 20, height = 20 }: TSortIconArgs) => {
  return (
    <svg xmlns='http://www.w3.org/2000/svg' width={width} height={height}>
      <path d='M6 3l-6 8h4v10h4V11h4L6 3zm16 14h-8v-2h8v2zm2 2H14v2h10v-2zm-4-8h-6v2h6v-2zm-2-4h-4v2h4V7zm-2-4h-2v2h2V3z' />
    </svg>
  );
};

const DesIcon = ({ width = 20, height = 20 }: TSortIconArgs) => {
  return (
    <svg xmlns='http://www.w3.org/2000/svg' width={width} height={height}>
      <path d='M6 21l6-8H8V3H4v10H0l6 8zM22 9h-8V7h8v2zm2-6H14v2h10V3zm-4 8h-6v2h6v-2zm-2 4h-4v2h4v-2zm-2 4h-2v2h2v-2z' />
    </svg>
  );
};

const SwitchSortIcons = ({ columnKey }: TSwitchSortIconArgs) => {
  if (!columnKey) {
    return <></>;
  }
  return columnKey === SortDirec.DES ? <DesIcon /> : <AscIcon />;
};

export function CountryTable({ data, type, setSortStrQuery }: TProps) {
  const [selectedColumn, setSelectedColumn] = useState<TSelectedColumn>({
    column: '',
    direc: '',
  });

  const sortColumn = (column: string) => {
    const { column: currColumn, direc } = selectedColumn;
    const { ASC, DES } = SortDirec;
    if (!currColumn) {
      setAndFormatColumnArgs({ column, direc: DES });
      return;
    }
    if (currColumn === column) {
      setAndFormatColumnArgs({
        column,
        direc: direc === DES ? ASC : DES,
      });
      return;
    }
    setAndFormatColumnArgs({ column, direc: DES });
  };

  const setAndFormatColumnArgs = ({ column, direc }: TSelectedColumn) => {
    const buildSelectedObj = {column, direc }
    setSelectedColumn(buildSelectedObj);
    if (setSortStrQuery) {
      setSortStrQuery(`${Object.values(buildSelectedObj).join('&')}`);
    }
  };

  return (
    <div className={styles.countryTable}>
      {!data || !data.length ? (
        <div>Table is Empty</div>
      ) : (
        <table>
          <thead>
            <tr>
              {Object.keys(data[0]).map((trValue, idx) => (
                <th key={idx}>
                  <div
                    className={styles.headerIconCtn}
                    onClick={() => sortColumn(trValue)}
                  >
                    <span>{trValue}</span>
                    {selectedColumn.column === trValue && type === 'CUSTOM' && (
                      <SwitchSortIcons columnKey={selectedColumn.direc} />
                    )}
                  </div>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {data.map((item, itemIdx) => {
              const values = Object.values(item).map(
                (subItem: any, subItemIdx) => (
                  <td key={subItemIdx}>{subItem}</td>
                )
              );
              return <tr key={itemIdx}>{values}</tr>;
            })}
          </tbody>
        </table>
      )}
    </div>
  );
}
