const asyncHandler=require('express-async-handler');
const Contact=require('../models/contactModel');
//@desc Get All contacts
//@routes GET /api/contacts
//@access public 
const getContacts = asyncHandler(async (req,res)=>{
    const contacts = await Contact.find();
    res.status(200).json(contacts);
});


//@desc create contacts
//@routes POST /api/contacts
//@access public 
const createContact = asyncHandler(async (req,res)=>{
    console.log(req.body);
    const {name, email,phone}= req.body;
    if(!name || !email|| !phone){
        res.status(400);
        throw new Error("All fields are mandatory");
    }
    const newContact= await Contact.create({
        name,
        email,
        phone
    })
    res.status(201).json(newContact);
});

//@desc Get single contacts
//@routes GET /api/contacts/:id
//@access public 
const getContact = asyncHandler(async (req,res)=>{
    const contact=await Contact.findById(req.params.id);
    if(!contact){
        res.status(400);
        throw new Error('Contact Not Found');
    }
    res.status(200).json(contact);
});

//@desc Delete contacts
//@routes Delete /api/contacts/:id
//@access public 
const deleteContact = asyncHandler(async (req,res)=>{
    const contact=await Contact.findById(req.params.id);
    if(!contact){
        res.status(400);
        throw new Error('Contact Not Found');
    }
    await Contact.deleteOne({_id:req.params.id});
    res.status(200).json(contact);
});

//@desc Update contacts
//@routes PUT /api/contacts/:id
//@access public 
const updateContact = asyncHandler(async (req,res)=>{
    const contact=await Contact.findById(req.params.id);
    if(!contact){
        res.status(400);
        throw new Error('Contact Not Found');
    }
    const updateContact=await Contact.findByIdAndUpdate(
        req.params.id,
        req.body,
        {new: true}
    )
    res.status(200).json(updateContact);
});

module.exports={
    getContacts,
    createContact,
    getContact,
    deleteContact,
    updateContact
}