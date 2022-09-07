import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import { Alert, InputNumber, Button, Form, Input, Select, Row, Col, Upload, Image, Modal, notification } from 'antd';
import { PlusOutlined, DeleteOutlined } from '@ant-design/icons';
import { Helmet } from 'react-helmet';
import { useDispatch, useSelector } from 'react-redux';
import { getProductDetail, deleteProductImage } from '../../features/product/productSlice';

import './index.css';

const { Option } = Select;

export default function ProductFormUpdate() {
	const { id } = useParams();
	const dispatch = useDispatch();
	const token = useSelector((state) => state.user.auth.token);
	const detail = useSelector((state) => state.product.detail.response);
	const navigate = useNavigate();

	const [form] = Form.useForm();
	const [previewVisible, setPreviewVisible] = useState(false);
	const [previewImage, setPreviewImage] = useState('');
	const [previewTitle, setPreviewTitle] = useState('');
	const [fileList, setFileList] = useState([]);
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState();
	const Promise = require('promise');

	const uploadProps = {
		onRemove: (file) => {
			const index = fileList.indexOf(file);
			const newFileList = fileList.slice();
			newFileList.splice(index, 1);
			setFileList(newFileList);
		},
		beforeUpload: async (file) => {
			console.log(fileList);
			const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png';
			if (!isJpgOrPng) {
				notification.open({
					message: 'Gambar harus berformat JPG/PNG!',
					className: 'global-alert-error',
					placement: 'top',
					duration: 3,
					style: {
						color: '#ffffff',
					},
				});
			}

			const isLt2M = file.size / 1024 / 1024 < 2;
			if (!isLt2M) {
				notification.open({
					message: 'Gambar tidak boleh lebih dari 2MB!',
					className: 'global-alert-error',
					placement: 'top',
					duration: 3,
					style: {
						color: '#ffffff',
					},
				});
			}

			if (detail.imgUrl.length + fileList.length > 3) {
				notification.open({
					message: 'Gambar tidak boleh lebih dari 4!',
					className: 'global-alert-error',
					placement: 'top',
					duration: 3,
					style: {
						color: '#ffffff',
					},
				});
			}

			if (isLt2M && detail.imgUrl.length + fileList.length <= 3 && isJpgOrPng) {
				setFileList([...fileList, file]);
				return false;
			}
		},
		fileList,
	};

	const getBase64 = (file) =>
		new Promise((resolve, reject) => {
			const reader = new FileReader();
			reader.readAsDataURL(file);

			reader.onload = () => resolve(reader.result);

			reader.onerror = (error) => reject(error);
		});

	const handlePreview = async (file) => {
		if (!file.url && !file.preview) {
			file.preview = await getBase64(file.originFileObj);
		}

		setPreviewImage(file.url || file.preview);
		setPreviewVisible(true);
		setPreviewTitle(file.name || file.url.substring(file.url.lastIndexOf('/') + 1));
	};

	const handleCancel = () => setPreviewVisible(false);
	const handleChange = ({ fileList: newFileList }) => setFileList(newFileList);

	const getFile = (e) => {
		if (Array.isArray(e)) {
			return e;
		}
		return e && e.fileList;
	};

	const onFinish = async (values) => {
		setLoading(true);
		values = {
			...values,
			status: 1,
			publish: 1,
			productId: id,
			imageFiles: fileList,
		};
		try {
			if (token) {
				let bodyFormData = new FormData();
				bodyFormData.append('productId', values.productId);
				bodyFormData.append('name', values.name);
				bodyFormData.append('price', values.price);
				bodyFormData.append('status', values.status);
				bodyFormData.append('publish', values.publish);
				bodyFormData.append('description', values.description);
				bodyFormData.append('category', values.category);

				if (detail.imgUrl.length + values.imageFiles.length > 4) {
					notification.open({
						message: 'Gambar tidak boleh lebih dari 4!',
						className: 'global-alert-error',
						placement: 'top',
						duration: 3,
						style: {
							color: '#ffffff',
						},
					});
					setLoading(false);
					console.log(values.imageFiles.length);
					return 0;
				}

				if (values.imageFiles.length > 0) {
					for (let index = 0; index < values.imageFiles.length; index++) {
						bodyFormData.append('imageFiles', values.imageFiles[index].originFileObj);
					}
				}

				const response = await axios({
					method: 'put',
					url: 'https://thriftorzo-api.herokuapp.com/product/update',
					data: bodyFormData,
					headers: {
						'Content-Type': 'multipart/form-data; boundary=<calculated when request is sent>',
						Accept: '*/*',
						Authorization: `Bearer ${token}`,
					},
				});

				notification.open({
					message: 'Berhasil Mengubah Produk!',
					className: 'global-alert-success',
					placement: 'top',
					duration: 3,
					style: {
						color: '#ffffff',
					},
				});
				setLoading(false);
				navigate('/product/detail/' + response.data.id);
			}
		} catch (err) {
			if (!err.response) {
				throw err;
			}
			setError(err.response.data);
		}
	};

	const deleteImage = async (url, productId) => {
		await dispatch(deleteProductImage({ token, url, productId }));
		await dispatch(getProductDetail(id));
		notification.open({
			message: 'Berhasil Menghapus Foto Produk!',
			className: 'global-alert-success',
			placement: 'top',
			duration: 3,
			style: {
				color: '#ffffff',
			},
		});
	};

	const navigateBack = () => {
		navigate(-1);
	};

	useEffect(() => {
		dispatch(getProductDetail(id));
		form.setFieldsValue(detail);
	}, [id]);

	return (
		<div className='container'>
			<Helmet>
				<title>Update Produk</title>
				<meta name='description' content='Helmet application' />
			</Helmet>
			<div className='update-profile-wrapper max-w-[568px] md:py-10 py-6 w-full mx-auto'>
				{!!error && <Alert className='mb-6' message='Error' description={error} type='error' showIcon />}
				<Form layout='vertical' form={form} name='control-hooks' onFinish={onFinish}>
					<Form.Item
						className='mb-4'
						name='name'
						label='Nama Produk'
						required={false}
						rules={[
							{
								required: true,
								message: 'Nama Produk tidak boleh kosong!',
							},
						]}
					>
						<Input placeholder='Nama Produk' />
					</Form.Item>
					<Form.Item
						className='mb-4'
						name='price'
						label='Harga Produk'
						required={false}
						rules={[
							{
								required: true,
								message: 'Harga Produk tidak boleh kosong!',
							},
							{
								type: 'number',
								message: 'Harga Produk harus angka!',
							},
						]}
					>
						<InputNumber step='5000' placeholder='Rp 0,00' />
					</Form.Item>
					<Form.Item
						className='mb-4'
						name='category'
						label='Kategori'
						required={false}
						rules={[
							{
								required: true,
								message: 'Kategori tidak boleh kosong!',
							},
						]}
					>
						<Select placeholder='Pilih Kategori' allowClear>
							<Option value='Kaos'>Kaos</Option>
							<Option value='Celana'>Celana</Option>
							<Option value='Sweater'>Sweater</Option>
							<Option value='Outer'>Outer</Option>
							<Option value='Kemeja'>Kemeja</Option>
						</Select>
					</Form.Item>
					<Form.Item
						className='mb-4'
						name='description'
						label='Deskripsi'
						required={false}
						rules={[
							{
								required: true,
								message: 'Deskripsi tidak boleh kosong',
							},
						]}
					>
						<Input.TextArea rows={2} placeholder='Tentang produk yang anda jual' />
					</Form.Item>
					<Form.Item
						className='mb-0'
						name='imageFiles'
						label='Foto Produk'
						required={false}
						getValueFromEvent={getFile}
					>
						<Upload
							{...uploadProps}
							listType='picture-card'
							className='product-upload relative mb-6 w-full'
							accept='image/*'
							fileList={fileList}
							onPreview={handlePreview}
							onChange={handleChange}
						>
							<PlusOutlined style={{ fontSize: '24px', color: '#8A8A8A' }} />
						</Upload>
						<Modal visible={previewVisible} title={previewTitle} footer={null} onCancel={handleCancel}>
							<img
								alt='example'
								style={{
									width: '100%',
								}}
								src={previewImage}
							/>
						</Modal>
					</Form.Item>
					<div className='mb-10 flex'>
						{!!detail &&
							detail.imgUrl &&
							detail.imgUrl.length > 0 &&
							detail.imgUrl.map((item) => (
								<div className='product-image-item flex flex-col items-center'>
									<Image width={102} height={102} src={item} className='rounded-2xl' />
									<Button
										onClick={() => deleteImage(item, id ? id : '')}
										type='primary'
										danger
										shape='circle'
										className='flex-shrink-0 mt-2'
									>
										<DeleteOutlined />
									</Button>
								</div>
							))}
					</div>
					<Form.Item>
						<Row gutter={16}>
							<Col span={12}>
								<Button onClick={navigateBack} ghost className='w-full btn-custom' type='primary'>
									Batal
								</Button>
							</Col>
							<Col span={12}>
								<Button
									className='w-full btn-custom '
									type='primary'
									htmlType='submit'
									loading={loading}
								>
									Terbitkan
								</Button>
							</Col>
						</Row>
					</Form.Item>
				</Form>
			</div>
		</div>
	);
}
