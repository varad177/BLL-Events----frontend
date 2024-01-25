
import React from 'react'




const List = ({ style, items }) => {
    return <ol className={`pl-5 ${style=='ordered' ?"list-decimal" : "list-desc"}`}>
        {
            items.map((listItems, i) => {
                return <li key={i} className='my-4 ' dangerouslySetInnerHTML={{ __html: listItems }}></li>
            })
        }
    </ol>
}




const EventContent = ({ block }) => {


    let { type, data } = block;
    if (type == 'paragraph') {
        return <p dangerouslySetInnerHTML={{
            __html: data.text
        }}></p>
    }
    if (type == "header") {
        if (data.level == 3) {
            return <h3 className='text-3xl font-bold ' dangerouslySetInnerHTML={{
                __html: data.text
            }}></h3>
        }

        return <h2 className='text-4xl font-bold ' dangerouslySetInnerHTML={{
            __html: data.text
        }}></h2>

    }

  

   
    if (type == 'list') {
        return <List style={data.style} items={data.items} />

    }
    else {
        return <h1>""</h1>
    }

}

export default EventContent
