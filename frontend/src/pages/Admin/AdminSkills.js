import React, { useState } from 'react';
import { Form, Input, Button, Modal, Tag, message } from 'antd';
import { useSelector, useDispatch } from 'react-redux';
import axios from 'axios';
import { setPortfolioData } from '../../redux/rootSlice'; // adjust path if needed

function AdminSkills() {
  const dispatch = useDispatch();
  const { PortfolioData } = useSelector((state) => state.root);
  const skills = PortfolioData?.skills?.[0] || {};
  const [visible, setVisible] = useState(false);
  const [category, setCategory] = useState('');
  const [inputValue, setInputValue] = useState('');
  const [editingList, setEditingList] = useState([]);
  const [loading, setLoading] = useState(false);

  const showModal = (cat) => {
    setCategory(cat);
    setEditingList(skills[cat] || []);
    setVisible(true);
  };


  
  const handleOk = async () => {
    setLoading(true);
    try {
      const response = await axios.post('/api/portfolio/update-skill', {
        _id: skills._id,
        [category]: editingList,
      });
      if (response.data.success) {
        message.success('Skills updated successfully');
        dispatch(setPortfolioData({
          ...PortfolioData,
          skills: [
            {
              ...skills,
              [category]: editingList,
            },
          ],
        }));
      } else {
        message.error('Failed to update skills');
      }
      setVisible(false);
      setCategory('');
      setEditingList([]);
    } catch (error) {
      console.error('Error updating skills:', error);
      message.error('Something went wrong');
    }
    setLoading(false);
  };

  const handleCancel = () => {
    setVisible(false);
    setCategory('');
    setEditingList([]);
  };

  const addSkill = () => {
    if (inputValue && !editingList.includes(inputValue)) {
      setEditingList([...editingList, inputValue]);
      setInputValue('');
    }
  };

const removeSkill = async (removedSkill) => {
  const newList = editingList.filter(skill => skill !== removedSkill);
  setEditingList(newList);
  setLoading(true);
  try {
    const response = await axios.post('/api/portfolio/update-skill', {
      _id: skills._id,
      [category]: newList,
    });
    if (response.data.success) {
      message.success('Skill deleted successfully');
      dispatch(setPortfolioData({
        ...PortfolioData,
        skills: [
          {
            ...skills,
            [category]: newList,
          },
        ],
      }));
    } else {
      message.error('Failed to delete skill');
    }
  } catch (error) {
    console.error('Error deleting skill:', error);
    message.error('Something went wrong');
  }
  setLoading(false);
};

  return (
    <div>
      <h2 className="text-xl font-semibold mb-4">Skills</h2>
      {['databases', 'programmingLanguages', 'webDevelopment'].map(cat => (
        <div key={cat} className="mb-4">
          <div className="flex items-center justify-between">
            <span className="font-semibold capitalize">{cat.replace(/([A-Z])/g, ' $1')}</span>
            <Button size="small" onClick={() => showModal(cat)}>Edit</Button>
          </div>
          <div className="mt-2">
            {(skills[cat] || []).map(skill => (
              <Tag key={skill}>{skill}</Tag>
            ))}
          </div>
        </div>
      ))}
      <Modal
        title={`Edit ${category.replace(/([A-Z])/g, ' $1')}`}
        open={visible}
        onOk={handleOk}
        onCancel={handleCancel}
        confirmLoading={loading}
        destroyOnClose
      >
        <div>
          {editingList.map(skill => (
            <Tag
              key={skill}
              closable
              onClose={() => removeSkill(skill)}
              style={{ marginBottom: 8 }}
            >
              {skill}
            </Tag>
          ))}
        </div>
        <Input
          placeholder="Add new skill"
          value={inputValue}
          onChange={e => setInputValue(e.target.value)}
          onPressEnter={addSkill}
          style={{ marginTop: 8, width: '70%' }}
        />
        <Button onClick={addSkill} style={{marginLeft: 8, marginTop: 8 }}>
          Add
        </Button>
      </Modal>
    </div>
  );
}

export default AdminSkills;