import React from 'react';
import TabPage from '../components/templates/TabPage';
import TableOfDataRatings from '../components/moleculas/TableOfDataRatings';
import TableOfDataCoaches from '../components/moleculas/TableOfDataCoaches';

function Administration() {
	return (
		<TabPage
			title="ADMINISTRATION PAGE"
			body={[
				{ name: "Coaches", content: <TableOfDataCoaches /> },
				{ name: "Reviews", content: <TableOfDataRatings /> }
			]}
		/>
	);
}

export default Administration;