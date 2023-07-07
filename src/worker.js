import { getTokenFromGCPServiceAccount } from '@sagi.io/workers-jwt';

export async function getAccessToken() {
	const jwtToken = await getTokenFromGCPServiceAccount({
		serviceAccountJSON: {
			type: 'service_account',
			project_id: 'stabil-drill-services',
			private_key_id: '692b6816195fd5d3f28763916af8158e0248f30a',
			private_key:
				'-----BEGIN PRIVATE KEY-----\nMIIEvAIBADANBgkqhkiG9w0BAQEFAASCBKYwggSiAgEAAoIBAQCk0FkI46DTDY7D\nYM08OYPGffKba9dHN3pFcapl76vr4MTQIS5Wbv1V+xoLuOlHkNKCaf/Zqx1yDAWS\nGhkmY+DIs3rso24Prq6aqa+Uy4B2L2iy5sbCpj/Y83/Mz6ooceSNdqh83hvTNRfo\nODaTGhwvIRZ8vSvnDfWpHoWx09WIpAkSmk4rLqQWJGHzcwYMNwDBPVxhbJyXqPqb\nrs6sG/CUnFCqFc+hHmWI+Q8V+Em9cAdyg9SLIeBgcNfBB7P0qbp/xGc1oMvcZIEV\n/c9sK0pR3ZNsW4XMAz+Kd+Ntl4bz25fLRGvCUmS+DR5K7encv4x1Y/RBkWayCOLz\n66Bgf7u5AgMBAAECggEADQ85TtwCnVagrliYSqJgD7VhKPGVoF4EAUatcuBX5hvs\nXHWUn2KyDkMUYENpsLMICy9tB4lojuXm9xm8Tm9xm1WlcuTMTs/PpA+4CvlJF5RQ\nHoTs0PWtb3pz8P2vhP7pVlBFr4dF+ylk2JDDukpCW3Wqu32d4fQYOCtj+qBHdkkw\nnWwxFtk0K74DL3veYH0NvdrxB/tPjnvdiuR5gbL5BM0Z+3yHxJB4GXc1oOveHveO\nfVeuCS86AnaXmbhifffYr3WiJ+3UNJghfgYxLxMn8dp7t1+BiDKQuzkDTydoPCiE\nFm9OMm10gohYcBh0YRjPWzxvV3AiVolgRwMpZ/0NgQKBgQDWlyjL+KtkNQzV/dJq\nMJDeoflQws2cEmOl8XQWFkYjk3VyU9oLbVgdd+Gcce86u//3GdK9njvdGn1Fm4xb\niEjuZWo51lnaABm3/wiGD7u28G5HHTb2wdOx3v8YzacBnXKblWgnL3m4EN3wuyze\nCIfvMHAnw/riXjOJGOdjqS2oMQKBgQDEnjUYKD6T4l1a4mYZmO3ALFhchR4c4GaB\nosjf0TbuGBGucLrkJGHUnbiYcflt6SZw027qBbs2m1qMqLYle2WlPeE4lY3T0VTj\nHGV6ARJN+ENMBTxGfTDv7e/d/YT8EQMTbohh3ojdlHG7BcbXASq5tiYaSaeVskBi\nXWLEuC9yCQKBgF4lqYd7zS5EvCHyn2tpbVXP+IM/RFgSFVgLzCOYmCMpoeCL+2EC\nEyOyofAyaIP7UXzG/pekoZ0K7yUn7neGHoFBS06exYMIgkAgi0vOAUxsxeU7Yw71\n0Pv72y21pGzn+A1cinqOsLdZ5xWj+TZcxc7iEILRz/Oa4r9mhrZJ1jcxAoGAam3F\nCb2HGh/XLsIMSGDamUKn1fUMts7VTeji2RxzonAO6iEFWUdEWYXCjWpsfQ1OjJY2\nnKDblRSE8EzGxAVGoSqcxjdWHUlbrNALMf5wfRocu4K9/N35Znaid8SqfpNq2dLk\nKi3+YgrfgUAAQRPVn880Uth5yXNCnLw2IYwdypkCgYALOQF+OVwUUYXVSRiIoUMF\n7ql0T847PcqEZAJenrW0IxQKKGKxDVfgXn39NdPS8YCGhXt9bLRN9Vw/90refoWx\n/uBmS8YG4wmNwn//KwGFkbBpumZqFvoDFkYPBrhJjgPH8bmAt9U9xuH9QiAF35y7\nUrvRnbwAJ8xf1eyrhzJXsw==\n-----END PRIVATE KEY-----\n',
			client_email: 'firebase-adminsdk-epcyk@stabil-drill-services.iam.gserviceaccount.com',
			client_id: '115646240936380729083',
			auth_uri: 'https://accounts.google.com/o/oauth2/auth',
			token_uri: 'https://oauth2.googleapis.com/token',
			auth_provider_x509_cert_url: 'https://www.googleapis.com/oauth2/v1/certs',
			client_x509_cert_url:
				'https://www.googleapis.com/robot/v1/metadata/x509/firebase-adminsdk-epcyk%40stabil-drill-services.iam.gserviceaccount.com',
			universe_domain: 'googleapis.com',
		},
		aud: 'https://oauth2.googleapis.com/token',
		payloadAdditions: {
			scope: ['https://www.googleapis.com/auth/datastore'],
		},
	});

	const accessToken = await (
		await fetch('https://oauth2.googleapis.com/token', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/x-www-form-urlencoded',
			},
			body: new URLSearchParams({
				grant_type: 'urn:ietf:params:oauth:grant-type:jwt-bearer',
				assertion: jwtToken, // the JWT token generated in the previous step
			}),
		})
	).json();

	return accessToken;
}

export async function getCollection() {
	const accessToken = await getAccessToken();

	const response = await (
		await fetch('https://firestore.googleapis.com/v1/projects/stabil-drill-services/databases/(default)/documents/contact-form', {
			method: 'GET',
			headers: {
				Authorization: 'Bearer ' + accessToken.access_token,
			},
		})
	).json();

	return response;
}
