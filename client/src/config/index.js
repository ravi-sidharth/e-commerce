export const registerFormControls = [
    {
        name:'userName',
        label:'User Name',
        placeholder: 'Enter your user name',
        componentType: 'input',
        type: 'text'
    },

    {
        name: 'email',
        label: 'Email',
        placeholder: 'Enter your Email',
        componentType: 'input',
        type: 'email'
    },

    {
        name: 'password',
        label: 'Password',
        placeholder: 'Enter your password',
        componentType: 'input',
        type: 'password'
    },
]

export const loginFormControls = [
    {
        name: 'email',
        label: 'Email',
        placeholder: 'Enter your Email',
        componentType: 'input',
        type: 'email'
    },

    {
        name: 'password',
        label: 'Password',
        placeholder: 'Enter your password',
        componentType: 'input',
        type: 'password'
    },
]

export const addProductFormElements = [
    {
        label :'Title',
        name :'title',
        componentType :'input',
        type:'text',
        placeholder:'Enter product title'
    },
    {
        label :'Description',
        name :'description',
        componentType :'textarea',
        placeholder:'Enter product description'
    },
    {
        label :'Category',
        name :'category',
        componentType :'select',
        options :[
            {id:"men", label:"Men"},
            {id:"women", label:"Women"},
            {id:"kids", label:"Kids"},
            {id:"accessories", label:"Accessories"},
            {id:"footwear", label:"Footwear"},
        ]
    },
    {
        label :'Brand',
        name :'brand',
        componentType :'select',
        options :[
            {id:"nike", label:"Nike"},
            {id:"addidas", label:"Addidas"},
            {id:"puma", label:"Puma"},
            {id:"levi", label:"Levi's"},
            {id:"h&m", label:"H&M"},
            {id:"zara", label:"Zara"},

        ]
    },
    
    {
        label:'Price',
        name:'price',
        componentType:'input',
        type:'number',
         placeholder:'Enter product price'
    },
    {
        label:'Sale Price',
        name:'salePrice',
        componentType:'input',
        type:'number',
        placeholder:'Enter sale price (optional)'
    },

    {
        label:'Total Stock',
        name:'totalStock',
        componentType:'input',
        type:'number',
        placeholder:'Enter total stock'
    },
]


export const shoppingViewHeaderMenuItems = [
    {
        id:'home',
        label:'Home',
        path:'/shop/home'
    },
    {
        id:'products',
        label:'Products',
        path:'/shop/listing'
    },
    {
        id:'men',
        label:'Men',
        path:'/shop/listing'
    },
    {
        id:'women',
        label:'Women',
        path:'/shop/listing'
    },
    {
        id:'kids',
        label:'Kids',
        path:'/shop/listing'
    },
    {
        id:'accessories',
        label:'Accessories',
        path:'/shop/listing'
    },
    {
        id:'footwear',
        label:'Footwear',
        path:'/shop/listing'
    },
    {
        id:'search',
        label:'Search',
        path:'/shop/search'
    }
]

export const filterOptions = {
    category: [
        {id:'men',label:'Men'},
        {id:'women',label:'Women'},
        {id:'kids',label:'Kids'},
        {id:'accessories',label:'Accessories'},
        {id:'footwear',label:'Footwear'},
    ],
    brand: [
        {id:'puma', label:'Puma'},
        {id:'nike', label:'Nike'},
        {id:'addidas', label:'Addidas'},
        {id:'h&m', label:'H&M'},
        {id:'levi', label:'Levi'},
        {id:'zara', label:'Zara'},
    ]
}

export const sortOptions = [
    {id:"price-lowtohigh", label:"Price: Low to High" },
    {id:"price-hightolow", label:"Price: High to Low" },
    {id:"title-atoz", label:"Title: A to Z" },
    {id:"title-ztoa", label:"Title: Z to A" },
]

export const addressFormControls = [
    {
        label:"Address",
        name : "address",
        componentType:"input",
        type:"text",
        placeholder:"Enter your address"
    },
    {
        label:"City",
        name : "city",
        componentType:"input",
        type:"text",
        placeholder:"Enter your city"
    },
    {
        label:"pincode",
        name : "pincode",
        componentType:"input",
        type:"number",
        placeholder:"Enter your pincode"
    },
    {
        label:"phone",
        name : "phone",
        componentType:"input",
        type:"number",
        placeholder:"Enter your phone number"
    },
    {
        label:"Notes",
        name : "notes",
        componentType:"textarea",
        placeholder:"Enter your additional notes"
    },
]
