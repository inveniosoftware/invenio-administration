# SPDX-FileCopyrightText: 2026 CERN.
# SPDX-License-Identifier: MIT

"""Administration HTTP error page handlers."""

from flask import current_app, render_template, request, url_for
from invenio_i18n import lazy_gettext as _
from invenio_theme import views as theme_views
from werkzeug.exceptions import HTTPException

_ERROR_CONTENT = {
    401: {
        "title": _("Sign in required"),
        "message": _(
            "You need to sign in before you can continue in the administration panel."
        ),
    },
    403: {
        "title": _("Access denied"),
        "message": _("You do not have permission to access this administration page."),
    },
    404: {
        "title": _("Page not found"),
        "message": _("The administration page you requested could not be found."),
    },
    429: {
        "title": _("Too many requests"),
        "message": _(
            "Too many requests were sent from your session. Please try again in a moment."
        ),
    },
    500: {
        "title": _("Something went wrong"),
        "message": _(
            "An unexpected error occurred while loading the administration panel."
        ),
    },
}

_ADMIN_ERROR_CODES = (401, 403, 404, 429, 500)


def _is_administration_request():
    """Check if the current request targets the administration UI."""
    admin_ext = current_app.extensions.get("invenio-administration")
    if not admin_ext:
        return False

    admin_url = admin_ext.administration.url.rstrip("/")
    request_path = request.path.rstrip("/")

    if request_path == admin_url:
        return True

    return bool(admin_url and request_path.startswith(f"{admin_url}/"))


def _render_administration_error(error):
    """Render the administration error page."""
    status_code = error.code if isinstance(error, HTTPException) else 500
    content = _ERROR_CONTENT.get(status_code, _ERROR_CONTENT[500])

    if status_code >= 500:
        current_app.logger.exception("Administration panel error")

    admin_ext = current_app.extensions["invenio-administration"]
    dashboard_endpoint = f"{admin_ext.administration.endpoint}.dashboard"

    return (
        render_template(
            "invenio_administration/error.html",
            title=content["title"],
            error_code=status_code,
            error_message=content["message"],
            back_url=url_for(dashboard_endpoint),
        ),
        status_code,
    )


def _administration_error_or_theme(error, theme_handler):
    """Render admin errors in the admin shell; keep theme handlers elsewhere."""
    if _is_administration_request():
        return _render_administration_error(error)

    return theme_handler(error)


def register_blueprint_error_handlers(blueprint):
    """Register error handlers on the administration blueprint."""
    # Flask resolves code-specific handlers before generic exception handlers.
    # invenio-theme registers app-level 403/404/etc., so blueprint handlers must
    # be registered per status code to take precedence inside admin views.
    for code in _ADMIN_ERROR_CODES:
        blueprint.register_error_handler(code, _render_administration_error)

    blueprint.register_error_handler(HTTPException, _render_administration_error)
    blueprint.register_error_handler(Exception, _render_administration_error)


def register_administration_error_handlers(app):
    """Register app-level handlers for admin URLs without a matching view."""
    app.register_error_handler(
        401,
        lambda error: _administration_error_or_theme(error, theme_views.unauthorized),
    )
    app.register_error_handler(
        403,
        lambda error: _administration_error_or_theme(
            error, theme_views.insufficient_permissions
        ),
    )
    app.register_error_handler(
        404,
        lambda error: _administration_error_or_theme(error, theme_views.page_not_found),
    )
    app.register_error_handler(
        429,
        lambda error: _administration_error_or_theme(
            error, theme_views.too_many_requests
        ),
    )
    app.register_error_handler(
        500,
        lambda error: _administration_error_or_theme(error, theme_views.internal_error),
    )
