import React from 'react';
import { Form, Input } from 'antd';
import { useSelector } from 'react-redux';
import axios from 'axios';
function AdminIntro() {
  const { PortfolioData } = useSelector((state) => state.root);

  if (!PortfolioData || !PortfolioData.intro) return null;

   const onFinish = async(values) => {
    try{
      const response= await axios.post('https://my-portfolio-backend-6mnv.onrender.com/api/portfolio/update-intro', {
        ...values,
        _id: PortfolioData?.intro?._id,
    });
      if(response.data.success){
        alert('Intro updated successfully');
    }else{
        alert('Failed to update intro');}}
    catch(error) {
      console.error('Error updating intro:', error);
    }
  }

  return (
    <div>
      <Form
        layout="vertical"
        onFinish={onFinish}
        initialValues={PortfolioData.intro}
        key={PortfolioData.intro._id}
      >
        <Form.Item
          name="welcomeText"
          label="Welcome Text"
          rules={[{ required: true, message: 'Please enter welcome text' }]}
        >
          <Input placeholder="Welcome Text" />
        </Form.Item>
        <Form.Item
          name="firstName"
          label="First Name"
          rules={[{ required: true, message: 'Please enter first name' }]}
        >
          <Input placeholder="First Name" />
        </Form.Item>
        <Form.Item
          name="lastName"
          label="Last Name"
          rules={[{ required: true, message: 'Please enter last name' }]}
        >
          <Input placeholder="Last Name" />
        </Form.Item>
        <Form.Item
          name="caption"
          label="Caption"
          rules={[{ required: true, message: 'Please enter a caption' }]}
        >
          <Input placeholder="Caption" />
        </Form.Item>
        <Form.Item
          name="description"
          label="Description"
          rules={[{ required: true, message: 'Please enter a description' }]}
        >
          <Input.TextArea placeholder="Description" rows={4} />
        </Form.Item>
        <div className='flex justify-end w-full'>
          <button
            className='px-10 py-2 bg-primary text-white rounded-md'
            type="submit"
          >
            Save
          </button>
        </div>
      </Form>
    </div>
  );
}

export default AdminIntro;
