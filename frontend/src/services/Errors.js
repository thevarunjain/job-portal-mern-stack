import $ from 'jquery';

const fixUnexpected = () => $(".err_box").removeClass("err_box_hidden").html('An unexpected error occurred!').addClass("err_box_visible");

const timeoutErrorBox = () => setTimeout(() => {$(".err_box").removeClass("err_box_visible").addClass("err_box_hidden") },5000);
const timeoutMessageBox = () => setTimeout(() => {$(".err_box").removeClass("err_box_visible").addClass("err_box_hidden") },5000);
export function printError(err)
{
    try
    {
        let keys = Object.keys(err);
        if(keys.indexOf('response') !== -1)
        {
            if($(".err_box").hasClass("err_box_visible"))
                $(".err_box").removeClass("err_box_visible err_box_hidden").html(err['response']['data']['message']).addClass("err_box_visible");
            else
                $(".err_box").removeClass("err_box_hidden").html(err['response']['data']['message']).addClass("err_box_visible");
            timeoutErrorBox();
        }
        else
        {
            fixUnexpected();
            timeoutErrorBox();
        }
    }
    catch(e)
    {
        fixUnexpected();
        timeoutErrorBox();
    }
}


export function printMessage(msg)
{
    try
    {
        if($(".err_box").hasClass("err_box_visible"))
                $(".err_box").removeClass("err_box_visible err_box_hidden").html(msg).addClass("err_box_visible");
            else
                $(".err_box").removeClass("err_box_hidden").html(msg).addClass("err_box_visible");
        timeoutMessageBox();
    }
    catch(e)
    {
        fixUnexpected();
        timeoutErrorBox(); 
    }
}

