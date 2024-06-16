import { Table } from 'flowbite-react';



export const TableComponent = ({ TableData }: any) => {

    return (
        <>
            <BaseTable TableData={TableData} />
        </>
    )
}

const BaseTable = ({ TableData }: any) => {



    return (<>
        <Table>
            <Table.Head >
                {Object.keys(TableData[0]).map((item) => (
                    <Table.HeadCell style={{width:'305px'}}>{item}</Table.HeadCell>
                ))}
            </Table.Head>
        </Table>
        <div className="overflow-x-auto scrollbar">
            <Table>
                <Table.Body className="divide-y">
                    {TableData.map((Row: any, index: number) => (
                        <Table.Row key={index} className="bg-white dark:border-gray-700 dark:bg-gray-800">
                            {Object.keys(Row).map((col) => (
                                <>
                                    <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
                                        {Row[col]}
                                    </Table.Cell>
                                </>
                            ))}
                        </Table.Row>
                    ))}
                </Table.Body>
            </Table>
        </div>
    </>
    );
}
