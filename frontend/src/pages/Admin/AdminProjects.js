import React, { useState } from 'react';
import { Form, Input, Modal, Table, message } from 'antd';
import { useSelector } from 'react-redux';
import axios from 'axios';

function AdminProjects() {
  const { PortfolioData } = useSelector((state) => state.root);
  const [showModal, setShowModal] = useState(false);
  const [selectedProject, setSelectedProject] = useState(null);
  const [form] = Form.useForm();

  const handleEdit = (project) => {
    setSelectedProject(project);
    form.setFieldsValue(project);
    setShowModal(true);
  };

  const handleDelete = async (projectId) => {
    try {
      await axios.post('/api/portfolio/delete-project', { _id: projectId });
      message.success('Project deleted successfully');
      window.location.reload(); 
    } catch (error) {
      message.error('Failed to delete project');
    }
  };

  const handleFinish = async (values) => {
    try {
      const endpoint = selectedProject
        ? '/api/portfolio/update-project'
        : '/api/portfolio/add-project';

      const payload = selectedProject
        ? { ...values, _id: selectedProject._id }
        : values;

      const response = await axios.post(endpoint, payload);

      if (response.data.success) {
        message.success('Project saved successfully');
        setShowModal(false);
        window.location.reload();
      } else {
        message.error('Failed to save project');
      }
    } catch (error) {
      console.error(error);
      message.error('Something went wrong');
    }
  };

  const columns = [
    { title: 'Title', dataIndex: 'title' },
    { title: 'Description', dataIndex: 'description' },
    {
      title: 'Actions',
      render: (text, record) => (
        <div className="flex gap-2">
          <button onClick={() => handleEdit(record)} className="text-blue-500">Edit</button>
          <button onClick={() => handleDelete(record._id)} className="text-red-500">Delete</button>
        </div>
      ),
    },
  ];

  return (
    <div>
      <div className="flex justify-end mb-4">
        <button
          className="bg-primary text-white px-6 py-2 rounded"
          onClick={() => {
            setSelectedProject(null);
            form.resetFields();
            setShowModal(true);
          }}
        >
          Add Project
        </button>
      </div>

      <Table
        dataSource={PortfolioData?.projects || []}
        columns={columns}
        rowKey="_id"
      />

      <Modal
        open={showModal}
        title={selectedProject ? 'Edit Project' : 'Add Project'}
        onCancel={() => setShowModal(false)}
        footer={null}
      >
        <Form layout="vertical" form={form} onFinish={handleFinish}>
          <Form.Item
            name="title"
            label="Title"
            rules={[{ required: true, message: 'Please enter title' }]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            name="description"
            label="Description"
            rules={[{ required: true, message: 'Please enter description' }]}
          >
            <Input.TextArea rows={4} />
          </Form.Item>

          <Form.Item
            name="projectUrl"
            label="Project URL"
            rules={[{ required: true, message: 'Please enter URL' }]}
          >
            <Input />
          </Form.Item>

          <div className="flex justify-end">
            <button type="submit" className="bg-primary text-white px-8 py-2 rounded">
              {selectedProject ? 'Update' : 'Add'}
            </button>
          </div>
        </Form>
      </Modal>
    </div>
  );
}

export default AdminProjects;
