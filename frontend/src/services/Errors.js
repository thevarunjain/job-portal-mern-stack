import $ from 'jquery'
export function showErros(err)
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
            fixUnexpected();
            timeoutErrorBox();
    }
    catch(e)
    {
        fixUnexpected();
        timeoutErrorBox();
    }
}

const fixUnexpected = () => $(".err_box").removeClass("err_box_hidden").html('An unexpected error occurred!').addClass("err_box_visible");

const timeoutErrorBox = () => setTimeout(() => {$(".err_box").removeClass("err_box_visible").addClass("err_box_hidden") },6000);