export const getUserId = (user: any): string => {
	let userId = '';

	if (user.roles.includes('applicant')) {
		userId = user.curp;
	} else if (user.roles.includes('student')) {
		userId = user.control_number;
	} else if (user.roles.includes('teacher')) {
		userId = user.teacher_number;
	} else {
		throw new Error('Invalid user role');
	}

	return userId;
};
