import { FormattedMessage, formatMessage } from 'umi-plugin-react/locale';
import React, { Component, Fragment } from 'react';
import { List } from 'antd';

const passwordStrength = {
	strong: (
		<span className="strong">
			<FormattedMessage id="account-setting.security.strong" defaultMessage="Strong" />
		</span>
	),
	medium: (
		<span className="medium">
			<FormattedMessage id="account-setting.security.medium" defaultMessage="Medium" />
		</span>
	),
	weak: (
		<span className="weak">
			<FormattedMessage id="account-setting.security.weak" defaultMessage="Weak" />
			Weak
		</span>
	)
};

class SecurityView extends Component {
	getData = () => [
		{
			title: formatMessage(
				{
					id: 'account-setting.security.password'
				},
				{}
			),
			description: (
				<Fragment>
					{formatMessage({
						id: 'account-setting.security.password-description'
					})}
					：{passwordStrength.strong}
				</Fragment>
			),
			actions: [
				<span key="Modify">
					<FormattedMessage id="account-setting.security.modify" defaultMessage="Modify" />
				</span>
			]
		},
		{
			title: formatMessage(
				{
					id: 'account-setting.security.phone'
				},
				{}
			),
			description: `${formatMessage(
				{
					id: 'account-setting.security.phone-description'
				},
				{}
			)}：138****8293`,
			actions: [
				<span key="Modify">
					<FormattedMessage id="account-setting.security.modify" defaultMessage="Modify" />
				</span>
			]
		},
		{
			title: formatMessage(
				{
					id: 'account-setting.security.question'
				},
				{}
			),
			description: formatMessage(
				{
					id: 'account-setting.security.question-description'
				},
				{}
			),
			actions: [
				<span key="Set">
					<FormattedMessage id="account-setting.security.set" defaultMessage="Set" />
				</span>
			]
		},
		{
			title: formatMessage(
				{
					id: 'account-setting.security.email'
				},
				{}
			),
			description: `${formatMessage(
				{
					id: 'account-setting.security.email-description'
				},
				{}
			)}：ant***sign.com`,
			actions: [
				<span key="Modify">
					<FormattedMessage id="account-setting.security.modify" defaultMessage="Modify" />
				</span>
			]
		},
		{
			title: formatMessage(
				{
					id: 'account-setting.security.mfa'
				},
				{}
			),
			description: formatMessage(
				{
					id: 'account-setting.security.mfa-description'
				},
				{}
			),
			actions: [
				<span key="bind">
					<FormattedMessage id="account-setting.security.bind" defaultMessage="Bind" />
				</span>
			]
		}
	];

	render() {
		const data = this.getData();
		return (
			<Fragment>
				<List
					itemLayout="horizontal"
					dataSource={data}
					renderItem={(item) => (
						<List.Item actions={item.actions}>
							<List.Item.Meta title={item.title} description={item.description} />
						</List.Item>
					)}
				/>
			</Fragment>
		);
	}
}

export default SecurityView;
