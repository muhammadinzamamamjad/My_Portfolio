import React from 'react';
import { Form, Input, message } from 'antd';
import { useSelector } from 'react-redux';
import axios from 'axios';

function AdminAbout() {
  const { PortfolioData } = useSelector((state) => state.root);

  if (!PortfolioData || !PortfolioData.about) return null;

  const onFinish = async (values) => {
    try {
      const response = await axios.post('/api/portfolio/update-about', {
        ...values,
        _id: PortfolioData.about._id,
      });

      if (response.data.success) {
        message.success('About section updated successfully');
      } else {
        message.error('Failed to update About section');
      }
    } catch (error) {
      console.error('Update error:', error);
      message.error('Something went wrong');
    }
  };

  return (
    <div>
      <Form
        layout="vertical"
        onFinish={onFinish}
        initialValues={PortfolioData.about}
        key={PortfolioData.about._id}
      >
        <Form.Item
          name="description1"
          label="Description 1"
          rules={[{ required: true, message: 'Please enter the first description' }]}
        >
          <Input.TextArea rows={4} placeholder="Enter first description..." />
        </Form.Item>

        <Form.Item
          name="description2"
          label="Description 2"
          rules={[{ required: true, message: 'Please enter the second description' }]}
        >
          <Input.TextArea rows={4} placeholder="Enter second description..." />
        </Form.Item>

        <Form.Item
          name="lottieUrl"
          label="Lottie Animation URL"
          rules={[{ required: true, message: 'Please enter the Lottie animation URL' }]}
        >
          <Input placeholder="Enter lottie animation URL..." />
        </Form.Item>

        <div className="flex justify-end">
          <button type="submit" className="bg-primary text-white px-8 py-2 rounded">
            Save
          </button>
        </div>
      </Form>
    </div>
  );
}

export default AdminAbout;
