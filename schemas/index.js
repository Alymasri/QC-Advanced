import * as z from 'zod';
import { zfd } from 'zod-form-data';

// ! LOGIN
export const LoginSchema = z.object({
	email: z.string().email(),
	password: z.string().min(1, { message: 'Password is required' }),
	user_type: z.string().min(1, { message: '' }),
});

// ! REGISTER/SIGN UP
export const RegisterSchema = z
	.object({
		profile:
			z.any() ||
			zfd
				.file()
				.refine((file) => file?.length !== 0, 'Required')
				.refine((file) => file.size < 2000000, {
					message: "File can't be bigger than 2MB.",
				})
				.refine(
					(file) =>
						['image/jpeg', 'image/png', 'image/jpg'].includes(file.type),
					{
						message: 'File format must be either jpg, jpeg or png.',
					}
				),
		fname: z.string().min(1, { message: 'First Name is required' }),
		lname: z.string().min(1, { message: 'Last Name is required' }),
		email: z.string().email(),
		ccode: z.string().min(1, { message: '' }).max(3, { message: '' }),
		phone: z.string().min(1, { message: 'Phone number is required' }),
		business_name: z.string().min(1, { message: 'Business Name is required' }),
		business_type_id: z.string().min(1, { message: 'Choose Business Type' }),
		address: z.string().min(1, { message: 'Address is required' }),
		password: z.string().min(1, { message: 'Password' }),
		confirm_password: z.string().min(1, { message: 'Password' }),
	})
	.refine((data) => data.password === data.confirm_password, {
		message: "Passwords don't match",
		path: ['confirm_password'],
	});

export const ForgotPasswordSchema = z.object({
	email: z.string().email(),
});

export const ResetPasswordSchema = z
	.object({
		new_pass: z.string().min(1, { message: 'Password' }),
		confirm_password: z.string().min(1, { message: 'Password' }),
	})
	.refine((data) => data.new_pass === data.confirm_password, {
		message: "Passwords don't match",
		path: ['confirm_password'],
	});

export const BusinessSchema = zfd.formData({
	// user_id: z.string().email().min(1, { message: 'Password is required' }),
	business_email: z.string().min(1, { message: 'Enter Business Email' }),
	business_name: z.string().min(1, { message: 'Enter Business Name' }),
	business_img: zfd
		.file()
		.refine((file) => file?.length !== 0, 'Required')
		.refine((file) => file.size < 2000000, {
			message: "File can't be bigger than 2MB.",
		})
		.refine(
			(file) => ['image/jpeg', 'image/png', 'image/jpg'].includes(file.type),
			{
				message: 'File format must be either jpg, jpeg or png.',
			}
		),
	// business_img: z.any(),
	location: z.string().min(1, { message: 'Enter Business Location' }),
});

export const ChecklistSchema = z.object({
	name: z.string().min(1, { message: 'Required' }),
	assignee_id: z.number(),
	sub_checklist: z.array(
		z.object({
			question: z.string(),
			media_upload_type: z.string(),
		})
	),
});

// ! INVITEE SCHEMA
export const InviteSchema = z
	.object({
		username: z.string().min(1, { message: 'Name is required' }),
		email: z.string().email().min(5, { message: 'Email is required' }),
		password: z.string().min(1, { message: 'Password' }),
		confirm_password: z.string().min(1, { message: 'Password' }),
	})
	.refine((data) => data.password === data.confirm_password, {
		message: "Passwords don't match",
		path: ['confirm_password'],
	});

export const NoteSchema = z.object({
	notes: z.string().min(1, { message: 'Required' }),
	follow_up: z.string().min(1, { message: 'Required' }),
});

// ! MINI ACTION
export const MiniActionSchema = z.object({
	title: z.string().min(1, { message: 'Enter Title' }),
	desc: z.string().min(1, { message: 'Enter Description' }),
	priority: z.string().min(1, { message: 'Select Priority' }),
	due_date: z.string().min(1, { message: 'Pick a Date' }),
	assignee_id: z.string().min(1, { message: 'Choose Assignee' }),
});

export const MiniMediaSchema = z.object({
	media: z.array(
		zfd
			.file()
			.refine((file) => file?.length !== 0, 'Required')
			.refine((file) => file.size < 2000000, {
				message: "File can't be bigger than 2MB.",
			})
			.refine(
				(file) => ['image/jpeg', 'image/png', 'image/jpg'].includes(file.type),
				{
					message: 'File format must be either jpg, jpeg or png.',
				}
			)
	),
});

// !TRAINING MATERIALS
export const TrainingMaterialSchema = z.object({
	image: zfd
		.file()
		.refine((file) => file?.length !== 0, 'Required')
		.refine((file) => file.size < 2000000, {
			message: "File can't be bigger than 2MB.",
		})
		.refine(
			(file) => ['image/jpeg', 'image/png', 'image/jpg'].includes(file.type),
			{
				message: 'File format must be either jpg, jpeg or png.',
			}
		),
	document:
		// z.any() ||
		zfd
			.file()
			.refine((file) => file?.length !== 0, 'Required')
			.refine((file) => file.size < 100000000, {
				message: "File can't be bigger than 100MB.",
			})
			.refine((file) => ['application/pdf'].includes(file.type), {
				message: 'File format must be pdf.',
			}),
	title: z.string().min(1, { message: 'Enter Title' }),
	description: z.string().min(1, { message: 'Enter Description' }),
	business_id: z.string().min(1, { message: 'Select Business' }),
});

export const EditTrainingMaterialSchema = z.object({
	image:
		z.any() ||
		zfd
			.file()
			.refine((file) => file?.length !== 0, 'Required')
			.refine((file) => file.size < 2000000, {
				message: "File can't be bigger than 2MB.",
			})
			.refine(
				(file) => ['image/jpeg', 'image/png', 'image/jpg'].includes(file.type),
				{
					message: 'File format must be either jpg, jpeg or png.',
				}
			),
	document:
		z.any() ||
		zfd
			.file()
			.refine((file) => file?.length !== 0, 'Required')
			.refine((file) => file.size < 100000000, {
				message: "File can't be bigger than 100MB.",
			})
			.refine((file) => ['application/pdf'].includes(file.type), {
				message: 'File format must be pdf.',
			}),
	// document: z.any(),
	title: z.string().min(1, { message: 'Enter Title' }),
	description: z.string().min(1, { message: 'Enter Description' }),
	business_id: z.string().min(1, { message: 'Select Business' }),
});

export const AdminActionSchema = z.object({
	business_id: z.string().min(1, { message: 'Select Business' }),
	title: z.string().min(1, { message: 'Enter Title' }),
	desc: z.string().min(1, { message: 'Enter Description' }),
	priority: z.string().min(1, { message: 'Select Priority' }),
	due_date: z.string().min(1, { message: 'Pick a Date' }),
	assignee_id: z.string().min(1, { message: 'Choose Assignee' }),
	to_do_list: z.string().min(1, { message: 'Required' }),
});

export const UserActionSchema = z.object({
	title: z.string().min(1, { message: 'Enter Title' }),
	desc: z.string().min(1, { message: 'Enter Description' }),
	priority: z.string().min(1, { message: 'Select Priority' }),
	due_date: z.string().min(1, { message: 'Pick a Date' }),
	assignee_id: z.string().min(1, { message: 'Choose Assignee' }),
	to_do_list: z.string().min(1, { message: 'Required' }),
});

export const AddActionCommentSchema = z.object({
	msg: z.string().min(1, { message: 'Required' }),
	media:
		z.any() ||
		zfd
			.file()
			.refine((file) => file?.length !== 0, 'Required')
			.refine((file) => file.size < 2000000, {
				message: "File can't be bigger than 2MB.",
			})
			.refine(
				(file) => ['image/jpeg', 'image/png', 'image/jpg'].includes(file.type),
				{
					message: 'File format must be either jpg, jpeg or png.',
				}
			),
});

// SETTINGS
export const ChangePasswordSchema = z
	.object({
		old_pass: z.string().min(1, { message: 'Required' }),
		new_pass: z.string().min(1, { message: 'Required' }),
		confirm_pass: z.string().min(1, { message: 'Required' }),
	})
	.refine((data) => data.new_pass === data.confirm_pass, {
		message: "Passwords don't match",
		path: ['confirm_pass'],
	});

export const ContactUsSchema = z.object({
	name: z.string().min(1, { message: 'Required' }),
	email: z.string().email(),
	subject: z.string().min(1, { message: '' }).max(3, { message: 'Required' }),
	msg: z.string().min(1, { message: 'Required' }),
});

// ! REGISTER/SIGN UP
export const EditProfileSchema = z.object({
	profile:
		z.any() ||
		zfd
			.file()
			.refine((file) => file?.length !== 0, 'Required')
			.refine((file) => file.size < 2000000, {
				message: "File can't be bigger than 2MB.",
			})
			.refine(
				(file) => ['image/jpeg', 'image/png', 'image/jpg'].includes(file.type),
				{
					message: 'File format must be either jpg, jpeg or png.',
				}
			),
	fname: z.any() || z.string().min(1, { message: 'First Name is required' }),
	lname: z.any() || z.string().min(1, { message: 'Last Name is required' }),
	business_name:
		z.any() || z.string().min(1, { message: 'Business Name is required' }),
	email: z.any() || z.string().email(),
	ccode: z.any() || z.string().min(1, { message: '' }).max(3, { message: '' }),
	phone: z.any() || z.string().min(1, { message: 'Phone number is required' }),
	business_type_id:
		z.any() || z.string().min(1, { message: 'Choose Business Type' }),
	address: z.any() || z.string().min(1, { message: 'Address is required' }),
});

// !LANDING PAGE SCHEMA
// * CONTACT US
export const LandingPageContactUsSchema = z.object({
	name: z.string().min(1, { message: 'Required' }),
	email: z.string().email(),
	subject: z.string().min(1, { message: '' }).max(3, { message: 'Required' }),
	msg: z.string().min(1, { message: 'Required' }),
});
