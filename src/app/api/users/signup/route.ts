//send verification mail
import {connect} from '@/dbConfig/dbConfig';
import User from '@/models/userModel';
import {NextRequest, NextResponse} from 'next/server';
import bcrypt from 'bcryptjs';
import {sendEmail} from '@/helpers/mailer';
connect();

export async function POST(request: NextRequest) {
  try {
    const reqBody = await request.json();
    const {email, username, password} = reqBody;

    const user = await User.findOne({email});
    if (user) {
      return NextResponse.json({error: 'User already exsist'}, {status: 400});
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = await User.create({
      email,
      username,
      password: hashedPassword,
    });
    const savedUser = await newUser.save();
    console.log(savedUser);

    await sendEmail({email, emailType: 'VERIFY', userId: savedUser._id});

    return NextResponse.json({
      message: 'User created successfully',
      success: true,
      savedUser,
    });
  } catch (error: any) {
    return NextResponse.json({error: error.message}, {status: 500});
  }
}
