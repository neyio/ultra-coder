import React, { Component } from 'react';
import { Button, Card, Col, Form, Icon, List, Row, Select, Tag, Empty } from 'antd';
import { connect } from 'dva';
import styled from 'styled-components';
import ArticleListContent from './components/ArticleListContent';
import StandardFormRow from './components/StandardFormRow';
import TagSelect from './components/TagSelect';
import styles from './style.less';
import ConditionRenderComponent from '../../../components/ConditionRenderComponent';
import MySchedule from './components/MySchedule';
import GroupTag from './components/GroupTag';

const { Option } = Select;
const FormItem = Form.Item;
const pageSize = 5;

const Title = styled.h3`
	font-size: 16px;
	padding: 0.5rem;
	margin-top: 0.5rem;
	color: #333;
`;

const ADCard = (
	{
		url = 'https://gw.alipayobjects.com/zos/rmsportal/mqaQswcyDLcXyDKnZfES.png',
		style = {
			width: 300,
			height: 150,
			overflow: 'hidden'
		},
		imageStyle = {}
	},
	alt = ''
) => {
	return (
		<Card
			style={{ ...style, borderRadius: '20px' }}
			cover={
				<div
					style={{
						...imageStyle,
						backgroundImage: `url(${url})`,
						width: style.width || '100%',
						height: style.height || 150,
						borderRadius: '20px',
						backgroundPosition: 'center',
						backgroundSize: 'contain'
					}}
				/>
			}
			bodyStyle={{
				padding: 0
			}}
			action={null}
		/>
	);
};

class All extends Component {
	componentDidMount() {
		const { dispatch } = this.props;
		dispatch({
			type: 'problemAll/fetch',
			payload: {
				count: 5
			}
		});
	}

	setOwner = () => {
		const { form } = this.props;
		form.setFieldsValue({
			owner: [ 'wzj' ]
		});
	};

	fetchMore = () => {
		const { dispatch } = this.props;
		dispatch({
			type: 'problemAll/appendFetch',
			payload: {
				count: pageSize
			}
		});
	};

	render() {
		const { form, problemAll: { list }, loading } = this.props;
		const { getFieldDecorator } = form;
		const owners = [
			{
				id: 'wzj',
				name: '我自己'
			},
			{
				id: 'wjh',
				name: '吴家豪'
			},
			{
				id: 'zxx',
				name: '周星星'
			},
			{
				id: 'zly',
				name: '赵丽颖'
			},
			{
				id: 'ym',
				name: '姚明'
			}
		];

		const IconText = ({ type, text }) => (
			<span>
				<Icon
					type={type}
					style={{
						marginRight: 8
					}}
				/>
				{text}
			</span>
		);

		const formItemLayout = {
			wrapperCol: {
				xs: {
					span: 24
				},
				sm: {
					span: 24
				},
				md: {
					span: 12
				}
			}
		};
		const loadMore =
			list.length > 0 ? (
				<div
					style={{
						textAlign: 'center',
						marginTop: 16
					}}
				>
					<Button
						onClick={this.fetchMore}
						style={{
							paddingLeft: 48,
							paddingRight: 48
						}}
					>
						{loading ? (
							<span>
								<Icon type="loading" /> 加载中...
							</span>
						) : (
							'加载更多'
						)}
					</Button>
				</div>
			) : null;
		return (
			<div className={styles.problemAllContainer}>
				<div className={styles.problemAllContainerLeft}>
					<Card bordered={false}>
						<Form layout="inline">
							<StandardFormRow
								title="所属类目"
								block
								style={{
									paddingBottom: 11
								}}
							>
								<FormItem>
									{getFieldDecorator('category')(
										<TagSelect expandable>
											<TagSelect.Option value="cat1">类目一</TagSelect.Option>
											<TagSelect.Option value="cat2">类目二</TagSelect.Option>
											<TagSelect.Option value="cat3">类目三</TagSelect.Option>
											<TagSelect.Option value="cat4">类目四</TagSelect.Option>
											<TagSelect.Option value="cat5">类目五</TagSelect.Option>
											<TagSelect.Option value="cat6">类目六</TagSelect.Option>
											<TagSelect.Option value="cat7">类目七</TagSelect.Option>
											<TagSelect.Option value="cat8">类目八</TagSelect.Option>
											<TagSelect.Option value="cat9">类目九</TagSelect.Option>
											<TagSelect.Option value="cat10">类目十</TagSelect.Option>
											<TagSelect.Option value="cat11">类目十一</TagSelect.Option>
											<TagSelect.Option value="cat12">类目十二</TagSelect.Option>
										</TagSelect>
									)}
								</FormItem>
							</StandardFormRow>
							<StandardFormRow title="owner" grid>
								<Row>
									<Col>
										<FormItem {...formItemLayout}>
											{getFieldDecorator('owner', {
												initialValue: [ 'wjh', 'zxx' ]
											})(
												<Select
													mode="multiple"
													style={{
														maxWidth: 286,
														width: '100%'
													}}
													placeholder="选择 owner"
												>
													{owners.map((owner) => (
														<Option key={owner.id} value={owner.id}>
															{owner.name}
														</Option>
													))}
												</Select>
											)}
											<Button
												className={styles.selfTrigger}
												onClick={this.setOwner}
												href="#"
												alt=""
											>
												只看自己的
											</Button>
										</FormItem>
									</Col>
								</Row>
							</StandardFormRow>
							<StandardFormRow title="其它选项" grid last>
								<Row gutter={16}>
									<Col xl={8} lg={10} md={12} sm={24} xs={24}>
										<FormItem {...formItemLayout} label="活跃用户">
											{getFieldDecorator('user', {})(
												<Select
													placeholder="不限"
													style={{
														maxWidth: 200,
														width: '100%'
													}}
												>
													<Option value="lisa">李三</Option>
												</Select>
											)}
										</FormItem>
									</Col>
									<Col xl={8} lg={10} md={12} sm={24} xs={24}>
										<FormItem {...formItemLayout} label="好评度">
											{getFieldDecorator('rate', {})(
												<Select
													placeholder="不限"
													style={{
														maxWidth: 200,
														width: '100%'
													}}
												>
													<Option value="good">优秀</Option>
												</Select>
											)}
										</FormItem>
									</Col>
								</Row>
							</StandardFormRow>
						</Form>
					</Card>
					<Card
						style={{
							marginTop: 24
						}}
						bordered={false}
						bodyStyle={{
							padding: '8px 32px 32px 32px'
						}}
					>
						<List
							size="large"
							loading={list.length === 0 ? loading : false}
							rowKey="id"
							itemLayout="vertical"
							loadMore={loadMore}
							dataSource={list}
							renderItem={(item) => (
								<List.Item
									key={item.id}
									actions={[
										<IconText key="star" type="star-o" text={item.star} />,
										<IconText key="like" type="like-o" text={item.like} />,
										<IconText type="message" key="message" text={item.message} />
									]}
									extra={<div className={styles.listItemExtra} />}
								>
									<List.Item.Meta
										title={
											<a className={styles.listItemMetaTitle} href={item.href}>
												{item.title}
											</a>
										}
										description={
											<span>
												<Tag>Ant Design</Tag>
												<Tag>设计语言</Tag>
												<Tag>蚂蚁金服</Tag>
											</span>
										}
									/>
									<ArticleListContent data={item} />
								</List.Item>
							)}
						/>
					</Card>
				</div>
				<aside
					style={{
						padding: '1.4rem 2rem'
					}}
				>
					<ConditionRenderComponent
						condition={() => {
							return true;
						}}
						otherwise={<Empty />}
					>
						<ADCard />
					</ConditionRenderComponent>
					<br />
					<Title>
						<Icon type="line-chart" size={24} /> 我的进展
						<span style={{ float: 'right' }}>
							<Icon type="setting" />
						</span>
					</Title>
					<MySchedule />
					<br />
					<Title>
						<Icon type="book" size={24} /> 标签
					</Title>
					<GroupTag
						items={[
							{
								id: 1,
								title: '动态规划',
								count: 13
							}
						]}
					/>
				</aside>
			</div>
		);
	}
}

const WarpForm = Form.create({
	onValuesChange({ dispatch }) {
		// 表单项变化时请求数据
		// 模拟查询表单生效
		dispatch({
			type: 'problemAll/fetch',
			payload: {
				count: 8
			}
		});
	}
})(All);
export default connect(({ problemAll, loading }) => ({
	problemAll,
	loading: loading.models.problemAll
}))(WarpForm);
