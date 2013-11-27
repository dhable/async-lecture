async-lecture
=============

This is a series of live coding that I gave for the Code Fellows
JS bootcamp in 2013 related to callback hell, using the async
library to help out and finally introducing promises with Q.

The application uses a fictional airline API to help me book holiday
travel home. The API functions are defined in lib.js and are designed
to simply mock out a real API. You would never use an API that returned
static data after a timeout. That's not really a useful API.

You can follow the progression through the lecture starting with
the file named V1_nesting_callbacks.js and working forward through
the iterative development process to V7_promises.js.


Getting Started
---------------
Each demo file can be run using node from the command line and specifying
the particular script you're interested in. Since I do use a few third 
party libraries, make sure you run ```npm install``` before trying to run
any demo file.


License
-------
The MIT License (MIT)

Copyright (c) 2013 Daniel T. Hable

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.