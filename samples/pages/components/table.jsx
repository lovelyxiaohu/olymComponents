import React,{Component} from "react";
import {Table} from 'olym';

const data = [{
    key: '1',
    name: '胡斌',
    age: 32,
    address: '南湖区湖底公园1号',
}, {
    key: '2',
    name: '胡彦祖a',
    age: 42,
    address: '西湖区湖底公园12号',
}, {
    key: '3',
    name: '李大嘴',
    age: 32,
    address: '南湖区湖底公园123号',
}, {
    key: '4',
    name: '李秀莲大嘴哥',
    age: 32,
    address: '西湖区湖底公园123号',
}];

const columns = [{
    title: '姓名',
    dataIndex: 'name',
    key: 'name',
    // filters: [
    //     { text: '姓李的', value: '李' },
    //     { text: '姓胡的', value: '胡' },
    // ],
    // filteredValue: filteredInfo.name,
    // onFilter: (value, record) => record.name.indexOf(value) === 0,
    sorter: true,
    // sortOrder: sortedInfo.columnKey === 'name' && sortedInfo.order,
}, {
    title: '年龄',
    dataIndex: 'age',
    key: 'age',
    sorter: true,
    // sortOrder: sortedInfo.columnKey === 'age' && sortedInfo.order,
}, {
    title: '地址',
    dataIndex: 'address',
    key: 'address',
    // filters: [
    //     { text: '南湖', value: '南湖' },
    //     { text: '西湖', value: '西湖' },
    // ],
    // filteredValue: filteredInfo.address,
    // onFilter: (value, record) => record.address.indexOf(value) === 0,
    sorter: true,
    // sortOrder: sortedInfo.columnKey === 'address' && sortedInfo.order,
}];

const customColumns = [
    {orderNo:1,dataIndex:"address",title:"地址"},
    {orderNo:4,dataIndex:"key",title:"key"},
    {orderNo:3,dataIndex:"name",title:"姓名"}
]




class TableSample extends Component{
    constructor(props) {
        super(props)
        this.state = {};
    }

    onChange = (pagination, filters, sorter) =>{
        console.log(pagination, filters, sorter)
    }

    onCustomChange = (a,b,c) =>{
        console.log(a,b,c)
    }

    render(){
        return(
            <Table showSeq columns={columns} dataSource={data} onChange={this.onChange} customColumns={customColumns} onCustomChange={this.onCustomChange}
            title="这是一个测试自定义列的表格"/>
        )
    }
}
export default TableSample;